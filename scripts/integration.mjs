import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
const status = JSON.parse(
  execFileSync("supabase", ["status", "-o", "json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }),
);
assert.equal(new URL(status.API_URL).hostname, "127.0.0.1");
const client = () =>
  createClient(status.API_URL, status.ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
const admin = createClient(status.API_URL, status.SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const fixture = JSON.parse(await readFile(".local/reviewer.json", "utf8"));
const a = client();
const b = client();
const password = randomBytes(24).toString("base64url");
const email = "isolation-" + Date.now() + "@example.test";
const created = await admin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});
assert.equal(created.error, null);
const bId = created.data.user.id;
try {
  const loginA = await a.auth.signInWithPassword(fixture);
  const loginB = await b.auth.signInWithPassword({ email, password });
  assert.equal(loginA.error, null);
  assert.equal(loginB.error, null);
  const aId = loginA.data.user.id;
  const token = loginA.data.session.access_token;
  assert.equal(
    (await a.from("profiles").upsert({ id: aId, display_name: "Alex Example" }))
      .error,
    null,
  );
  assert.equal(
    (
      await b
        .from("profiles")
        .upsert({ id: bId, display_name: "Other Example" })
    ).error,
    null,
  );
  const other = await a.from("profiles").select("*").eq("id", bId);
  assert.deepEqual(other.data, []);
  assert.ok(
    (await a.from("profiles").upsert({ id: bId, display_name: "Intrusion" }))
      .error,
  );
  assert.ok((await client().from("profiles").select("*")).error);
  const path = aId + "/isolation-proof.txt";
  await a.storage.from("private-files").remove([path]);
  assert.equal(
    (
      await a.storage
        .from("private-files")
        .upload(path, new Blob(["synthetic"], { type: "text/plain" }))
    ).error,
    null,
  );
  assert.ok((await b.storage.from("private-files").download(path)).error);
  assert.ok(
    (
      await b.storage
        .from("private-files")
        .upload(
          aId + "/intrusion.txt",
          new Blob(["no"], { type: "text/plain" }),
        )
    ).error,
  );
  await b.storage.from("private-files").remove([path]);
  assert.equal(
    (await a.storage.from("private-files").download(path)).error,
    null,
  );
  await a.storage.from("private-files").remove([path]);
  const base = "http://127.0.0.1:8787";
  assert.equal((await fetch(base + "/api/files")).status, 401);
  assert.equal(
    (
      await fetch(base + "/api/files", {
        headers: { Authorization: "Bearer invalid" },
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await fetch(base + "/api/files", {
        headers: {
          Authorization: "Bearer " + token,
          Origin: "https://evil.example",
        },
      })
    ).status,
    403,
  );
  assert.equal((await fetch(base + "/api/ready")).status, 200);
  const deniedUpload = await fetch(base + "/api/files/code.html", {
    method: "PUT",
    headers: { Authorization: "Bearer " + token, "Content-Type": "text/html" },
    body: "<script>bad</script>",
  });
  assert.equal(deniedUpload.status, 415);
  const oversized = await fetch(base + "/api/files/large.txt", {
    method: "PUT",
    headers: { Authorization: "Bearer " + token, "Content-Type": "text/plain" },
    body: "x".repeat(2097153),
  });
  assert.equal(oversized.status, 413);
  const apiFile = "api-isolation-" + Date.now() + ".txt";
  const authorization = { Authorization: "Bearer " + token };
  try {
    const upload = () =>
      fetch(base + "/api/files/" + apiFile, {
        method: "PUT",
        headers: { ...authorization, "Content-Type": "text/plain" },
        body: "API round-trip evidence",
      });
    assert.equal((await upload()).status, 201);
    assert.equal((await upload()).status, 409);
    const download = await fetch(base + "/api/files/" + apiFile, {
      headers: authorization,
    });
    assert.equal(download.status, 200);
    assert.equal(
      download.headers.get("content-disposition"),
      'attachment; filename="' + apiFile + '"',
    );
    assert.equal(download.headers.get("x-content-type-options"), "nosniff");
    assert.equal(await download.text(), "API round-trip evidence");
    const otherDownload = await fetch(base + "/api/files/" + apiFile, {
      headers: { Authorization: "Bearer " + loginB.data.session.access_token },
    });
    assert.notEqual(otherDownload.status, 200);
    assert.equal(
      (
        await fetch(base + "/api/files/%2Eprivate.txt", {
          method: "PUT",
          headers: { ...authorization, "Content-Type": "text/plain" },
          body: "invalid name",
        })
      ).status,
      400,
    );
  } finally {
    assert.equal(
      (
        await fetch(base + "/api/files/" + apiFile, {
          method: "DELETE",
          headers: authorization,
        })
      ).status,
      200,
    );
  }
  const mcp = await fetch(base + "/api/mcp", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: "system_status", arguments: {} },
    }),
  });
  assert.equal(mcp.status, 200);
  const result = await mcp.json();
  assert.equal(result.result.content[0].type, "text");
  assert.equal(JSON.parse(result.result.content[0].text).authenticated, true);
  assert.ok(mcp.headers.get("x-request-id"));
  console.log(
    "PASS: profile RLS, anonymous denial, cross-user read/write/storage isolation, ownership-safe delete, invalid JWT, origin rejection, readiness, MIME/size limits, API file round-trip, duplicate rejection, download safety headers, invalid filenames, authenticated MCP and correlation IDs.",
  );
} finally {
  await admin.auth.admin.deleteUser(bId);
}
