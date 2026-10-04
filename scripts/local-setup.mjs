import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
const status = JSON.parse(
  execFileSync("supabase", ["status", "-o", "json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }),
);
if (
  new URL(status.API_URL).hostname !== "127.0.0.1" ||
  !status.API_URL.endsWith(":58321")
)
  throw new Error("Refusing non-local setup.");
await mkdir(".local", { recursive: true, mode: 0o700 });
const path = ".local/reviewer.json";
let fixture;
try {
  fixture = JSON.parse(await readFile(path, "utf8"));
} catch {
  fixture = {
    email: "learner@example.test",
    password: randomBytes(24).toString("base64url"),
  };
}
const admin = createClient(status.API_URL, status.SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const { data, error } = await admin.auth.admin.listUsers();
if (error) throw new Error("Cannot read local accounts.");
if (!data.users.some((u) => u.email === fixture.email)) {
  const result = await admin.auth.admin.createUser({
    ...fixture,
    email_confirm: true,
  });
  if (result.error) throw new Error("Cannot create synthetic local account.");
}
await writeFile(path, JSON.stringify(fixture), { mode: 0o600 });
await writeFile(
  ".dev.vars",
  'SUPABASE_PUBLISHABLE_KEY="' + status.ANON_KEY + '"\n',
  { mode: 0o600 },
);
// Browser review fixture is generated only in local source, never in a production build.
console.log(
  "Local database connected. Synthetic reviewer saved privately in .local/reviewer.json.",
);
