import { afterEach, expect, test } from "vitest";
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdtempSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readFileSync,
  rmSync,
  chmodSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const script = path.resolve("scripts/provision.mjs");
const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0))
    rmSync(root, { recursive: true, force: true });
});
function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "provision-version-"));
  roots.push(root);
  const source = path.join(root, "source");
  const target = path.join(root, "learner");
  mkdirSync(source);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: source,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  git("init", "-b", "main");
  writeFileSync(
    path.join(source, "base-version.json"),
    JSON.stringify({ status: "local-review-candidate" }),
  );
  writeFileSync(path.join(source, "selected.txt"), "tagged source");
  git("add", ".");
  git(
    "-c",
    "user.name=Provision Test",
    "-c",
    "user.email=test@example.invalid",
    "commit",
    "-m",
    "fixture",
  );
  const commit = git("rev-parse", "HEAD");
  const bin = path.join(root, "bin");
  mkdirSync(bin);
  const calls = path.join(root, "pnpm-calls");
  const stub = path.join(bin, "pnpm");
  writeFileSync(
    stub,
    '#!/bin/sh\nprintf "%s\\n" "$*" >> "$PROVISION_TEST_CALLS"\n',
  );
  chmodSync(stub, 0o755);
  const run = (...args: string[]) =>
    spawnSync(process.execPath, [script, ...args], {
      cwd: source,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${bin}:${process.env.PATH}`,
        PROVISION_TEST_CALLS: calls,
      },
    });
  return { source, target, git, commit, calls, run };
}

test("with no version it copies the commit that is checked out", () => {
  const f = fixture();
  const result = f.run(f.target);
  expect(result.status, result.stderr).toBe(0);
  expect(readFileSync(path.join(f.target, "selected.txt"), "utf8")).toBe(
    "tagged source",
  );
  expect(
    JSON.parse(readFileSync(path.join(f.target, "base-version.json"), "utf8")),
  ).toEqual({
    status: "local-review-candidate",
    sourceCommit: f.commit,
    sourceTag: null,
  });
});
test("needs a destination, and a version that looks like a version", () => {
  const f = fixture();
  expect(f.run().stderr).toContain("Usage: pnpm provision");
  expect(f.run(f.target, "main").stderr).toContain("Usage: pnpm provision");
  expect(existsSync(f.target)).toBe(false);
  expect(existsSync(f.calls)).toBe(false);
});
test("unavailable stable tag fails clearly without writing or installing", () => {
  const f = fixture();
  f.git("tag", "v0.1.0-rc.2");
  const result = f.run(f.target, "v0.1.0");
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("Version tag v0.1.0 is unavailable");
  expect(existsSync(f.target)).toBe(false);
  expect(existsSync(f.calls)).toBe(false);
});
test("a branch name cannot substitute for the named release tag", () => {
  const f = fixture();
  f.git("branch", "v0.1.0");
  const result = f.run(f.target, "v0.1.0");
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("unavailable");
  expect(existsSync(f.target)).toBe(false);
});
test("explicit candidate archives the exact tag and preserves candidate provenance", () => {
  const f = fixture();
  f.git("tag", "v0.1.0-rc.3");
  writeFileSync(
    path.join(f.source, "selected.txt"),
    "later uncommitted source",
  );
  const result = f.run(f.target, "v0.1.0-rc.3");
  expect(result.status, result.stderr).toBe(0);
  expect(readFileSync(path.join(f.target, "selected.txt"), "utf8")).toBe(
    "tagged source",
  );
  expect(
    JSON.parse(readFileSync(path.join(f.target, "base-version.json"), "utf8")),
  ).toEqual({
    status: "local-review-candidate",
    sourceCommit: f.commit,
    sourceTag: "v0.1.0-rc.3",
  });
  expect(readFileSync(f.calls, "utf8")).toBe(
    "install --frozen-lockfile\nrun doctor\n",
  );
  expect(
    execFileSync("git", ["remote"], { cwd: f.target, encoding: "utf8" }),
  ).toBe("");
  const repeated = f.run(f.target, "v0.1.0-rc.3");
  expect(repeated.stderr).toContain("Destination already exists");
  expect(readFileSync(f.calls, "utf8")).toBe(
    "install --frozen-lockfile\nrun doctor\n",
  );
});
