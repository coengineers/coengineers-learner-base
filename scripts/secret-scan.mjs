import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
const paths = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean);
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})/,
  /sb_secret_[A-Za-z0-9_-]{20,}/,
  // Payment keys: secret and restricted keys (test or live), live publishable keys, signing secrets.
  /(?:sk|rk)_(?:test|live)_[A-Za-z0-9]{10,}/,
  /pk_live_[A-Za-z0-9]{10,}/,
  /whsec_[A-Za-z0-9]{10,}/,
  /eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}/,
];
let failures = 0;
for (const p of paths) {
  if (p === "pnpm-lock.yaml" || p === "scripts/secret-scan.mjs") continue;
  if (
    /^(?:\.env(?!\.example)|\.dev.vars|\.local\/|node_modules\/|dist\/)/.test(p)
  ) {
    console.error("Excluded material in source: " + p);
    failures++;
    continue;
  }
  const content = readFileSync(p, "utf8");
  if (patterns.some((pattern) => pattern.test(content))) {
    console.error("Potential credential in " + p + " (value withheld)");
    failures++;
  }
}
if (failures) process.exitCode = 1;
else console.log("Source credential scan passed (" + paths.length + " files).");
