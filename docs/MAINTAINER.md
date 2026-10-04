# Maintain the foundation

`main` is the release: founders copy it with Use this template, so only merge what has passed the check.

## Versions and upgrades

Use semantic versions in `base-version.json`. Security fixes require an explicit learner notification and reviewed patch; framework upgrades are separate changes. Compare a learner's recorded source version with a newer base in a branch. Never overwrite their product files. Resolve conflicts with their business requirements, run verification and let the learner approve.

## Migration and rollback

The Drizzle schema records typed application tables; ordered SQL migrations additionally own provider-specific auth references, constraints, grants, RLS and storage policies. This deliberate split must be reviewed together. Do not apply Drizzle push to hosted data. Use additive migrations first, deploy compatible code, then remove old columns in a later release.

Code rollback restores a known Worker version. Schema rollback must not drop new user data; prefer a corrective forward migration. Before a destructive change, export and test recovery in an isolated environment. Database exports alone do not back up file contents or external OAuth credentials. The [local recovery drill](RECOVERY.md) now proves identity, profile and file restoration with ownership checks in an isolated fixture. Full hosted recovery and scheduled/off-site backups remain release blockers.

## Local isolation

The canonical preview uses Supabase project ID `coengineers-learner-base`, database port 58322, API port 58321, mail port 58324, Worker port 8787 and Vite port 4310. Provisioning assigns the copy a distinct Docker project and deterministic local ports, updating configuration, scripts, tests and documentation together. If those ports are already occupied, stop and choose a new destination rather than borrowing another application's services.

## Putting a copy online

Each copy lives in accounts its founder owns: the code on GitHub, the database on Supabase, the app on Cloudflare. Free plans, no card.

- `pnpm run online` builds the app and puts it on the copy's free Cloudflare address, using the `online` block in `wrangler.jsonc`. Rename `my-app-test` in that block to the app's own name first.
- Three settings are typed once into the hosting's own settings and kept on every update: `APP_ORIGIN` (the app's own address), `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. None of them is written in the code. Until they are set, `/api/health` answers and everything else says it cannot connect.
- The database is set up from `supabase/migrations/`, in date order: with `supabase db push` against the founder's own project, or by running each file in the project's SQL editor. Never use `supabase config push`: the checked-in settings are for the local copy (email confirmation is off there).
- In the project's sign-in settings, the site address is the app's own address and its `/account` page is an allowed return address. Keep email confirmation on.
- The loopback values in `wrangler.jsonc` must never serve a hosted app. No hosted service-role key is needed by the runtime.

Checked on 2 October 2026 from a fresh copy made with Use this template: the app opens on its sign-in page at a free Cloudflare address, health and readiness are green against a free Supabase project in London, and the settings survive an update. Not yet checked from this base: sign-up, confirmation and recovery email on a hosted address, an update that follows an approved change by itself, and backups.

## Hosted email sign-in

The app offers email/password sign-in, account creation and password recovery in local and hosted modes. Keep hosted email confirmation enabled. Configure the Supabase site URL and allowed redirects for the HTTPS app origin and `/account`. Configure custom SMTP before inviting people outside the project's team; the default Supabase mail service is restricted. Verify signup confirmation, recovery, password update and sign-in on the actual hosted origin using a controlled test address. Local inbox tests and a locally simulated hosted screen do not prove delivery or provider settings. See [Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp), checked 25 September 2026.

## Carry Ship skills with learner copies

Claude Code on the web runs the skills kept in the app at `.claude/skills/`, not the plugin installed in Claude. So the app carries its own copy of the 20 Ship skills (the build skills, the accounts session and the Week 13 to 21 labs), and that copy has to be kept up to date with the plugin.

There is one way skills reach this base app: `scripts/vendor-ship-skills.py`. Its `SKILLS` list is the list. Nobody copies skill files in by hand.

```sh
python3 scripts/vendor-ship-skills.py /path/to/coengineers-plugin --replace
```

The plugin checkout must be committed and clean. The command copies the listed skills and every file they use, records the plugin version, commit and each file's SHA-256 in `.claude/ship-skills-manifest.json`, and reads every installed file back. Running it again on the same plugin commit changes nothing. Without `--replace` it refuses to touch skills that are already there. With `--replace` it replaces them only if nobody has edited them since they were last brought in; otherwise it names the edited files and changes nothing. Open the result as a change and merge it when the check is green.

Run it after every plugin release that touches a build skill or a Ship lab.

### Bringing a learner's existing copy up to date

A copy made from the template has the skills that were on `main` that day. To bring it up to date, the founder pastes this into Claude Code with their app chosen:

> Bring my app's skills up to date from the CoEngineers base app, as a change for me to approve.

Claude Code runs this one line in the app's folder and opens the change:

```sh
git fetch https://github.com/coengineers/coengineers-learner-base.git main && git restore --source=FETCH_HEAD --staged --worktree -- .claude/skills .claude/ship-skills-manifest.json
```

It replaces only the skills folder and its manifest. The founder's own app code is not touched.
