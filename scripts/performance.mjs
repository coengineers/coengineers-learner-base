import { writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";
import os from "node:os";
import { createClient } from "@supabase/supabase-js";
const seconds = Number(process.env.SMOKE_SECONDS ?? 600);
const rps = 20;
const maxConcurrency = 100;
const status = JSON.parse(
  execFileSync("supabase", ["status", "-o", "json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }),
);
if (new URL(status.API_URL).hostname !== "127.0.0.1")
  throw Error("Local smoke only.");
const client = createClient(status.API_URL, status.ANON_KEY, {
  auth: { persistSession: false },
});
const admin = createClient(status.API_URL, status.SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const fixture = {
  email: "performance-" + Date.now() + "@example.test",
  password: randomBytes(24).toString("base64url"),
};
const created = await admin.auth.admin.createUser({
  ...fixture,
  email_confirm: true,
});
if (created.error) throw Error("Cannot create isolated performance account.");
const { data, error } = await client.auth.signInWithPassword(fixture);
if (error) throw Error("Local sign-in failed.");
const latencies = [];
let errors = 0;
let dropped = 0;
const active = new Set();
const statuses = {};
const started = Date.now();
for (let i = 0; i < seconds * rps; i++) {
  const wait = started + (i * 1000) / rps - Date.now();
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  if (active.size >= maxConcurrency) {
    dropped++;
    continue;
  }
  const task = (async () => {
    const start = performance.now();
    try {
      const response = await fetch("http://127.0.0.1:8787/api/trpc/profile", {
        headers: { Authorization: "Bearer " + data.session.access_token },
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) errors++;
      statuses[response.status] = (statuses[response.status] ?? 0) + 1;
      await response.arrayBuffer();
    } catch {
      errors++;
    } finally {
      latencies.push(performance.now() - start);
    }
  })();
  active.add(task);
  void task.finally(() => active.delete(task));
}
await Promise.all(active);
latencies.sort((a, b) => a - b);
const receipt = {
  date: new Date().toISOString(),
  environment: {
    platform: os.platform(),
    arch: os.arch(),
    cpu: os.cpus()[0].model,
    node: process.version,
  },
  workload: {
    seconds,
    targetRequestsPerSecond: rps,
    maxConcurrency,
    authenticatedPath: "/api/trpc/profile",
    note: "Repeated authenticated requests from one synthetic identity; not 100 distinct sessions or a hosted CPU guarantee.",
  },
  requests: latencies.length,
  errors,
  statuses,
  dropped,
  p95Ms: latencies[Math.floor(latencies.length * 0.95)],
  elapsedSeconds: (Date.now() - started) / 1000,
};
receipt.passed =
  errors / latencies.length < 0.01 && dropped === 0 && receipt.p95Ms < 500;
await writeFile(".local/performance.json", JSON.stringify(receipt, null, 2));
await admin.auth.admin.deleteUser(created.data.user.id);
console.log(JSON.stringify(receipt, null, 2));
if (!receipt.passed) process.exitCode = 1;
