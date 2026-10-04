import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
export default async function setup() {
  const status = JSON.parse(
    execFileSync("supabase", ["status", "-o", "json"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }),
  );
  if (new URL(status.API_URL).hostname !== "127.0.0.1")
    throw Error("Tests require local Supabase.");
  const fixture = JSON.parse(await readFile(".local/reviewer.json", "utf8"));
  const client = createClient(status.API_URL, status.ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client.auth.signInWithPassword(fixture);
  if (error || !data.user)
    throw Error("Run pnpm run setup to prepare local test identity.");
  const bucket = client.storage.from("private-files");
  const files = await bucket.list(data.user.id, { limit: 100 });
  if (files.error) throw Error("Local storage unavailable.");
  const generated = files.data
    .filter((file) =>
      /^practice-(desktop|mobile|firefox|webkit)-\d+\.txt$/.test(file.name),
    )
    .map((file) => data.user.id + "/" + file.name);
  if (generated.length) {
    const removed = await bucket.remove(generated);
    if (removed.error) throw Error("Cannot clean synthetic test uploads.");
  }
}
