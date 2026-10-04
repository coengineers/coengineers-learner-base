import { z } from "zod";
export const configuration = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(20),
  APP_ORIGIN: z.string().url(),
  APP_ENV: z.enum(["local", "uat", "production"]),
});
export type Configuration = z.infer<typeof configuration>;
export function parseConfiguration(value: unknown) {
  const parsed = configuration.safeParse(value);
  if (!parsed.success) throw new Error("CONFIGURATION_INVALID");
  const config = parsed.data;
  if (
    config.APP_ENV !== "local" &&
    (!config.SUPABASE_URL.startsWith("https://") ||
      !config.APP_ORIGIN.startsWith("https://"))
  )
    throw new Error("Hosted configuration requires HTTPS.");
  if (
    config.APP_ENV === "local" &&
    !["127.0.0.1", "localhost"].includes(new URL(config.SUPABASE_URL).hostname)
  )
    throw new Error("Local mode requires a local database.");
  return config;
}
