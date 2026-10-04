import { it, expect, vi, afterEach } from "vitest";
import app from "../../apps/api/src/index";
const env = {
  APP_ENV: "local",
  APP_ORIGIN: "http://127.0.0.1:4310",
  SUPABASE_URL: "http://127.0.0.1:58321",
  SUPABASE_PUBLISHABLE_KEY: "synthetic-publishable-value",
};
afterEach(() => vi.unstubAllGlobals());
it("returns liveness without contacting a provider, with no-store and request ID", async () => {
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  const response = await app.request("http://127.0.0.1/api/health", {}, env);
  expect(response.status).toBe(200);
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(response.headers.get("x-request-id")).toMatch(/^[\da-f-]{36}$/);
  expect(fetch).not.toHaveBeenCalled();
});
it("answers liveness before the app has its database and settings", async () => {
  const response = await app.request("http://127.0.0.1/api/health", {}, {});
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: "ok", version: "0.1.0" });
  const config = await app.request("http://127.0.0.1/api/config", {}, {});
  expect(config.status).toBe(503);
  expect(await config.text()).not.toContain("SUPABASE");
});
it("readiness fails safely when the dependency is unavailable", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockRejectedValue(new Error("private-provider-detail")),
  );
  const response = await app.request("http://127.0.0.1/api/ready", {}, env);
  expect(response.status).toBe(503);
  expect(await response.text()).not.toContain("private-provider-detail");
});
it("local configuration refuses public hostnames", async () => {
  const response = await app.request(
    "https://accidental.workers.dev/api/config",
    {},
    env,
  );
  expect(response.status).toBe(503);
});
it("rejects an unapproved browser origin before authentication or provider I/O", async () => {
  const fetch = vi.fn();
  vi.stubGlobal("fetch", fetch);
  const response = await app.request(
    "http://127.0.0.1/api/files",
    { headers: { Origin: "https://attacker.example" } },
    env,
  );
  expect(response.status).toBe(403);
  expect(fetch).not.toHaveBeenCalled();
});
it("missing config fails closed without disclosing environment values", async () => {
  const response = await app.request("http://127.0.0.1/api/config", {}, {});
  expect(response.status).toBe(503);
  expect(await response.text()).not.toContain("SUPABASE");
});
it("public configuration exposes only the deliberately public allowlist", async () => {
  const response = await app.request(
    "http://127.0.0.1/api/config",
    {},
    { ...env, PRIVATE_SERVER_VALUE: "do-not-expose" },
  );
  expect(await response.json()).toEqual({
    url: env.SUPABASE_URL,
    publishableKey: env.SUPABASE_PUBLISHABLE_KEY,
    local: true,
  });
});
it("requires a bearer token on private endpoints", async () => {
  const response = await app.request("http://127.0.0.1/api/files", {}, env);
  expect(response.status).toBe(401);
});
