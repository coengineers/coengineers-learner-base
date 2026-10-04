import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
if (!process.argv.includes("--confirm-local-reset"))
  throw Error(
    "This removes local practice data. Run pnpm db:reset --confirm-local-reset only when ready.",
  );
if (
  !readFileSync("supabase/config.toml", "utf8").includes(
    'project_id = "coengineers-learner-base"',
  )
)
  throw Error("Unexpected project.");
execFileSync("supabase", ["db", "reset", "--local"], { stdio: "inherit" });
execFileSync(process.execPath, ["scripts/local-setup.mjs"], {
  stdio: "inherit",
});
