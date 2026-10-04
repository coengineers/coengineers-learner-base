import { createClient } from "@supabase/supabase-js";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { z } from "zod";
import type { AppRouter } from "../../../api/src/transport/router";
const publicConfig = z.object({
  url: z.string().url(),
  publishableKey: z.string().min(20),
  local: z.boolean(),
});
const response = await fetch("/api/config");
if (!response.ok)
  throw new Error("The app cannot connect. Please refresh in a moment.");
export const config = publicConfig.parse(await response.json());
export const auth = createClient(config.url, config.publishableKey);
export const api = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      async headers() {
        const { data } = await auth.auth.getSession();
        return data.session
          ? { Authorization: "Bearer " + data.session.access_token }
          : {};
      },
    }),
  ],
});
export async function privateRequest(path: string, options: RequestInit = {}) {
  const { data } = await auth.auth.getSession();
  const response = await fetch("/api" + path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: "Bearer " + (data.session?.access_token ?? ""),
    },
  });
  if (!response.ok) {
    const payload = z
      .object({ error: z.string() })
      .safeParse(await response.json().catch(() => null));
    throw new Error(
      payload.success
        ? payload.data.error
        : "We could not complete that request. Please try again.",
    );
  }
  return response;
}
