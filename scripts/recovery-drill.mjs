// Destructive test ONLY for a separately provisioned, synthetic local fixture.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir, realpath } from "node:fs/promises";
import path from "node:path";
import { randomBytes, createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const rootArgument = process.argv[2];
const expectedProject = process.argv[3];
if (
  !rootArgument ||
  !/^learner-[a-f0-9]{10}$/.test(expectedProject ?? "") ||
  !process.argv.includes("--confirm-synthetic-reset")
)
  throw Error(
    "Usage: node scripts/recovery-drill.mjs /absolute/fixture learner-PROJECT --confirm-synthetic-reset. Never run against a human-used copy.",
  );
const root = await realpath(rootArgument);
const config = await readFile(path.join(root, "supabase/config.toml"), "utf8");
assert.equal(config.match(/^project_id = "([^"]+)"/m)?.[1], expectedProject);
const manifest = JSON.parse(
  await readFile(path.join(root, "base-version.json"), "utf8"),
);
assert.match(manifest.sourceTag, /^v\d+\.\d+\.\d+-rc\.\d+$/);
const run = (command, args, input) =>
  execFileSync(command, args, {
    cwd: root,
    input,
    stdio: ["pipe", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024,
  });
const status = JSON.parse(run("supabase", ["status", "-o", "json"]));
const api = new URL(status.API_URL);
assert.equal(api.hostname, "127.0.0.1");
assert.notEqual(api.port, "58321");
assert.equal(Number(api.port), Number(config.match(/^port = (\d+)/m)?.[1]));
const container = "supabase_db_" + expectedProject;
const inspect = JSON.parse(run("docker", ["inspect", container]))[0];
assert.equal(
  inspect.Config.Labels["com.supabase.cli.project"],
  expectedProject,
);
const client = (key = status.ANON_KEY) =>
  createClient(status.API_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
const admin = client(status.SERVICE_ROLE_KEY);
const sql = (query) =>
  run(
    "docker",
    [
      "exec",
      "-i",
      container,
      "psql",
      "-U",
      "postgres",
      "-d",
      "postgres",
      "-v",
      "ON_ERROR_STOP=1",
      "-At",
    ],
    query,
  )
    .toString()
    .trim();
// Refuse unfamiliar data. This drill is not a production backup tool.
assert.equal(
  sql(
    "select count(*) from auth.users where email is null or email not like '%@example.test';",
  ),
  "0",
);
assert.equal(
  sql("select count(*) from storage.objects;"),
  "0",
  "Fixture must contain no pre-existing files.",
);
const backup = path.join(root, ".local", "recovery-" + Date.now());
await mkdir(backup, { recursive: true, mode: 0o700 });
let stage = "seed";
const started = Date.now();
try {
  const identity = {
    email: "restore-" + Date.now() + "@example.test",
    password: randomBytes(24).toString("base64url"),
  };
  const created = await admin.auth.admin.createUser({
    ...identity,
    email_confirm: true,
  });
  assert.equal(created.error, null);
  const actor = created.data.user.id;
  const owner = client();
  assert.equal((await owner.auth.signInWithPassword(identity)).error, null);
  assert.equal(
    (
      await owner
        .from("profiles")
        .upsert({ id: actor, display_name: "Recovery Example" })
    ).error,
    null,
  );
  const objectPath = actor + "/recovery-evidence.txt";
  const bytes = Buffer.from(
    "Synthetic recovery evidence: preserve these exact bytes.\n",
  );
  assert.equal(
    (
      await owner.storage
        .from("private-files")
        .upload(objectPath, bytes, { contentType: "text/plain" })
    ).error,
    null,
  );

  stage = "backup";
  const dump = run("docker", [
    "exec",
    container,
    "pg_dump",
    "-U",
    "postgres",
    "-d",
    "postgres",
    "--data-only",
    "--schema=auth",
    "--schema=public",
    "--exclude-table=auth.schema_migrations",
    "--no-owner",
    "--no-privileges",
    "--disable-triggers",
  ]);
  await writeFile(path.join(backup, "identity-and-profile.sql"), dump, {
    mode: 0o600,
  });
  const exported = await owner.storage
    .from("private-files")
    .download(objectPath);
  assert.equal(exported.error, null);
  const fileBytes = Buffer.from(await exported.data.arrayBuffer());
  await writeFile(path.join(backup, "file.bin"), fileBytes, { mode: 0o600 });
  const hash = createHash("sha256").update(fileBytes).digest("hex");
  await writeFile(
    path.join(backup, "manifest.json"),
    JSON.stringify({
      sourceTag: manifest.sourceTag,
      project: expectedProject,
      objectPath,
      sha256: hash,
    }),
    { mode: 0o600 },
  );
  console.log(
    "Backup created privately; starting the confirmed synthetic fixture reset.",
  );

  stage = "reset";
  run("supabase", ["db", "reset", "--local"]);
  assert.equal(sql("select count(*) from auth.users;"), "0");
  assert.equal(sql("select count(*) from public.profiles;"), "0");
  assert.equal(sql("select count(*) from storage.objects;"), "0");

  stage = "restore";
  // Migrations rebuild tables, policies and buckets; this dump restores auth + app data.
  // Local provider-owned auth tables require the container's administrative role.
  // The password expands only inside the validated fixture container, never in logs.
  run(
    "docker",
    [
      "exec",
      "-i",
      container,
      "sh",
      "-c",
      'PGPASSWORD="$POSTGRES_PASSWORD" psql -U supabase_admin -d postgres --single-transaction -v ON_ERROR_STOP=1',
    ],
    await readFile(path.join(backup, "identity-and-profile.sql")),
  );
  const restoredOwner = client();
  const login = await restoredOwner.auth.signInWithPassword(identity);
  assert.equal(login.error, null);
  assert.equal(login.data.user.id, actor);
  const profile = await restoredOwner
    .from("profiles")
    .select("display_name")
    .eq("id", actor)
    .single();
  assert.equal(profile.error, null);
  assert.equal(profile.data.display_name, "Recovery Example");
  assert.equal(
    (
      await restoredOwner.storage
        .from("private-files")
        .upload(objectPath, await readFile(path.join(backup, "file.bin")), {
          contentType: "text/plain",
          upsert: true,
        })
    ).error,
    null,
  );
  const restored = await restoredOwner.storage
    .from("private-files")
    .download(objectPath);
  assert.equal(restored.error, null);
  assert.equal(
    createHash("sha256")
      .update(Buffer.from(await restored.data.arrayBuffer()))
      .digest("hex"),
    hash,
  );
  const reviewer = client();
  assert.equal(
    (
      await reviewer.auth.signInWithPassword(
        JSON.parse(
          await readFile(path.join(root, ".local/reviewer.json"), "utf8"),
        ),
      )
    ).error,
    null,
  );
  assert.deepEqual(
    (await reviewer.from("profiles").select("*").eq("id", actor)).data,
    [],
  );
  assert.ok(
    (await reviewer.storage.from("private-files").download(objectPath)).error,
  );
  assert.ok(
    (await client().storage.from("private-files").download(objectPath)).error,
  );
  assert.equal(
    (await restoredOwner.storage.from("private-files").remove([objectPath]))
      .error,
    null,
  );
  assert.equal((await admin.auth.admin.deleteUser(actor)).error, null);
  const receipt = {
    date: new Date().toISOString(),
    project: expectedProject,
    sourceTag: manifest.sourceTag,
    elapsedSeconds: (Date.now() - started) / 1000,
    passed: true,
    checks: [
      "empty-after-reset",
      "identity-and-password-restored",
      "profile-restored",
      "file-sha256-match",
      "reviewer-login-restored",
      "cross-user-profile-denied",
      "cross-user-file-denied",
      "anonymous-file-denied",
    ],
    limits:
      "Local synthetic fixture only; schema recreated from migrations. No hosted OAuth, provider settings, key rotation, off-site backup or scheduled RPO proof.",
  };
  await writeFile(
    path.join(root, ".local/recovery-result.json"),
    JSON.stringify(receipt, null, 2) + "\n",
    { mode: 0o600 },
  );
  console.log(JSON.stringify(receipt, null, 2));
} catch {
  console.error(
    "Recovery drill failed during " +
      stage +
      ". Private backup retained at " +
      backup +
      ". Provider details suppressed; do not publish dumps.",
  );
  process.exitCode = 1;
}
