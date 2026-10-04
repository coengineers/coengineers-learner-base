import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
const checks = [
  [
    "Node 22.19+",
    () => {
      const [major, minor] = process.versions.node.split(".").map(Number);
      if (major < 22 || (major === 22 && minor < 19)) throw Error();
    },
  ],
  ["pnpm", () => execFileSync("pnpm", ["--version"], { stdio: "ignore" })],
  [
    "Docker running",
    () => execFileSync("docker", ["info"], { stdio: "ignore" }),
  ],
  [
    "Supabase CLI",
    () => execFileSync("supabase", ["--version"], { stdio: "ignore" }),
  ],
  [
    "Dependencies installed",
    () => {
      if (!existsSync("node_modules")) throw Error();
    },
  ],
];
let failed = false;
for (const [label, check] of checks) {
  try {
    check();
    console.log("OK " + label);
  } catch {
    failed = true;
    console.error("NEEDS ATTENTION " + label);
  }
}
if (failed) process.exitCode = 1;
