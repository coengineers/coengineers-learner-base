import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { secureHeaders } from "hono/secure-headers";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { parseConfiguration } from "../../../packages/config/src";
import {
  fileName,
  maxFileBytes,
  mimeTypes,
} from "../../../packages/contracts/src";
import { services, type Services } from "./composition";
import { appRouter } from "./transport/router";

const app = new Hono<{
  Bindings: Env;
  Variables: { requestId: string; services: Services };
}>();
app.use("*", secureHeaders());
app.use("/api/*", async (c, next) => {
  const requestId = crypto.randomUUID();
  c.set("requestId", requestId);
  c.header("X-Request-Id", requestId);
  c.header("Cache-Control", "no-store");
  const started = Date.now();
  await next();
  c.header("X-Request-Id", requestId);
  c.header("Cache-Control", "no-store");
  // Never record paths, bodies, identifiers, tokens or provider exception messages.
  console.log(
    JSON.stringify({
      event: "request",
      requestId,
      method: c.req.method,
      status: c.res.status,
      durationMs: Date.now() - started,
    }),
  );
});
// Liveness: answers even before the app has its database and settings, so a new copy
// can be seen to be online. It reveals nothing else.
app.get("/api/health", (c) => c.json({ status: "ok", version: "0.1.0" }));
app.use(
  "/api/*",
  bodyLimit({
    maxSize: maxFileBytes,
    onError: (c) =>
      c.json({ error: "This file is too large. Choose one under 2 MB." }, 413),
  }),
);
app.use("/api/*", async (c, next) => {
  const config = parseConfiguration(c.env);
  if (
    config.APP_ENV === "local" &&
    !["127.0.0.1", "localhost"].includes(new URL(c.req.url).hostname)
  ) {
    return c.json(
      { error: "Local configuration cannot serve a hosted application." },
      503,
    );
  }
  const origin = c.req.header("Origin");
  if (origin && origin !== config.APP_ORIGIN)
    return c.json({ error: "Origin not allowed." }, 403);
  await next();
});
app.get("/api/config", (c) => {
  const config = parseConfiguration(c.env);
  return c.json({
    url: config.SUPABASE_URL,
    publishableKey: config.SUPABASE_PUBLISHABLE_KEY,
    local: config.APP_ENV === "local",
  });
});
app.get("/api/ready", async (c) => {
  const config = parseConfiguration(c.env);
  try {
    const response = await fetch(config.SUPABASE_URL + "/auth/v1/health", {
      headers: { apikey: config.SUPABASE_PUBLISHABLE_KEY },
      signal: AbortSignal.timeout(3000),
    });
    return c.json(
      { status: response.ok ? "ok" : "unavailable" },
      response.ok ? 200 : 503,
    );
  } catch {
    return c.json({ status: "unavailable" }, 503);
  }
});
app.use("/api/*", async (c, next) => {
  const auth = c.req.header("Authorization");
  if (!auth?.startsWith("Bearer "))
    return c.json({ error: "Please sign in to continue." }, 401);
  try {
    c.set("services", await services(parseConfiguration(c.env), auth.slice(7)));
  } catch (error) {
    const unauthorised =
      error instanceof Error && error.message === "UNAUTHENTICATED";
    return c.json(
      {
        error: unauthorised
          ? "Your session has ended. Please sign in again."
          : "We cannot connect right now. Please try again.",
      },
      unauthorised ? 401 : 503,
    );
  }
  await next();
});
app.all("/api/trpc/*", (c) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => ({ services: c.get("services") }),
  }),
);
app.get("/api/files", async (c) =>
  c.json(await c.get("services").files.list()),
);
app.put("/api/files/:name", async (c) => {
  const name = fileName.parse(c.req.param("name"));
  const contentType = c.req.header("Content-Type") ?? "";
  if (!mimeTypes.includes(contentType))
    return c.json({ error: "Choose a PNG, JPG, WebP, PDF or text file." }, 415);
  await c
    .get("services")
    .files.upload(name, await c.req.arrayBuffer(), contentType);
  return c.json({ saved: true }, 201);
});
app.get("/api/files/:name", async (c) => {
  const name = fileName.parse(c.req.param("name"));
  const blob = await c.get("services").files.download(name);
  return new Response(blob, {
    headers: {
      "Content-Type": blob.type,
      "Content-Disposition": 'attachment; filename="' + name + '"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Request-Id": c.get("requestId"),
    },
  });
});
app.delete("/api/files/:name", async (c) => {
  await c.get("services").files.remove(fileName.parse(c.req.param("name")));
  return c.json({ removed: true });
});
app.post("/api/mcp", async (c) => {
  const server = new McpServer({ name: "learner-base", version: "0.1.0" });
  server.registerTool(
    "system_status",
    {
      description:
        "Read the base version and confirm the current authenticated account boundary.",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({ version: "0.1.0", authenticated: true }),
        },
      ],
    }),
  );
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  return transport.handleRequest(c.req.raw);
});
app.onError((error, c) => {
  const conflict = error.message === "FILE_EXISTS";
  const invalid = error.name === "ZodError";
  return c.json(
    {
      error: conflict
        ? "A file with that name already exists. Rename your file and try again."
        : invalid
          ? "Check the information and try again."
          : "We cannot complete this right now. Please try again.",
      requestId: c.get("requestId"),
    },
    conflict ? 409 : invalid ? 400 : 503,
  );
});
app.notFound((c) => c.json({ error: "Not found." }, 404));
export default app;
