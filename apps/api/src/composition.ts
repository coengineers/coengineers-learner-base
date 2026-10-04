import { createClient } from "@supabase/supabase-js";
import type { Configuration } from "../../../packages/config/src";
import { accountService } from "./modules/account/application/service";
import { profileRepository } from "./modules/account/infrastructure/supabase";
import { filesService } from "./modules/files/application/service";
import { fileStore } from "./modules/files/infrastructure/supabase";
export async function services(config: Configuration, token: string) {
  const client = createClient(
    config.SUPABASE_URL,
    config.SUPABASE_PUBLISHABLE_KEY,
    {
      global: {
        headers: { Authorization: "Bearer " + token },
        fetch: (input, init) =>
          fetch(input, { ...init, signal: AbortSignal.timeout(8000) }),
      },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
  const { data, error } = await client.auth.getUser(token);
  if (
    error &&
    ((error.status ?? 0) >= 500 || error.name === "AuthRetryableFetchError")
  )
    throw new Error("DEPENDENCY_UNAVAILABLE");
  if (error || !data.user) throw new Error("UNAUTHENTICATED");
  return {
    account: accountService(profileRepository(client, data.user.id)),
    files: filesService(fileStore(client, data.user.id)),
  };
}
export type Services = Awaited<ReturnType<typeof services>>;
