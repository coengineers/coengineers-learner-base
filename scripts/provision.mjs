import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
// A second working copy on this computer, for a developer. Founders take their copy on GitHub
// with "Use this template" (see README.md) and never run this.
const destination = process.argv[2];
const version = process.argv[3];
if (!destination || (version && !/^v\d+\.\d+\.\d+(?:-rc\.\d+)?$/.test(version)))
  throw Error(
    "Usage: pnpm provision /absolute/new-folder [version-tag]. " +
      "With no tag it copies the commit you have checked out.",
  );
const target = path.resolve(destination);
if (existsSync(target))
  throw Error("Destination already exists. Nothing was changed.");
let commit;
try {
  commit = execFileSync(
    "git",
    [
      "rev-parse",
      "--verify",
      version ? "refs/tags/" + version + "^{commit}" : "HEAD^{commit}",
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  ).trim();
} catch {
  throw Error(
    version
      ? "Version tag " +
          version +
          " is unavailable in this checkout. No destination was created."
      : "This folder has no commit to copy. No destination was created.",
  );
}
const archive = execFileSync("git", ["archive", "--format=tar", commit], {
  maxBuffer: 20 * 1024 * 1024,
});
mkdirSync(target, { recursive: true });
execFileSync("tar", ["-xf", "-", "-C", target], { input: archive });
// Give each independent copy its own Docker project and local ports.
const digest = createHash("sha256").update(target).digest("hex");
const firstPort = 20000 + (parseInt(digest.slice(0, 4), 16) % 3000) * 10;
const replacements = new Map([
  ["58320", String(firstPort)],
  ["58321", String(firstPort + 1)],
  ["58322", String(firstPort + 2)],
  ["58324", String(firstPort + 3)],
  ["8787", String(firstPort + 4)],
  ["4310", String(firstPort + 5)],
]);
function configure(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) configure(file);
    else if (/\.(?:mjs|ts|tsx|json|jsonc|toml|md|yml)$/.test(file)) {
      let content = readFileSync(file, "utf8");
      for (const [from, to] of replacements)
        content = content.replaceAll(from, to);
      if (
        file.endsWith("supabase/config.toml") ||
        file.endsWith("scripts/reset.mjs")
      )
        content = content.replaceAll(
          'project_id = "coengineers-learner-base"',
          'project_id = "learner-' + digest.slice(0, 10) + '"',
        );
      writeFileSync(file, content);
    }
  }
}
configure(target);
execFileSync("git", ["init", "-b", "main"], { cwd: target, stdio: "ignore" });
const manifest = JSON.parse(
  readFileSync(path.join(target, "base-version.json"), "utf8"),
);
writeFileSync(
  path.join(target, "base-version.json"),
  JSON.stringify(
    { ...manifest, sourceCommit: commit, sourceTag: version ?? null },
    null,
    2,
  ) + "\n",
);
execFileSync("pnpm", ["install", "--frozen-lockfile"], {
  cwd: target,
  stdio: "inherit",
});
execFileSync("pnpm", ["run", "doctor"], { cwd: target, stdio: "inherit" });
console.log(
  "Local preview port: " +
    (firstPort + 5) +
    ". Supabase project: learner-" +
    digest.slice(0, 10),
);
console.log(
  "Independent source created at " +
    target +
    ". No remote, history, credentials or data copied. Follow README.md to start isolated local services and verify.",
);
