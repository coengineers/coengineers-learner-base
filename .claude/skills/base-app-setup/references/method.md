# Method: how the base app fits together

Read this when you need the parts, the account steps or the costs. Say it in plain words with the founder.

## The parts

| Part | What it does | Where it lives |
|---|---|---|
| The pages | What people see and click | Where the app lives online, on the test address |
| The doorway | Checks who is asking, then does only what that person may | Where the app lives online, same address |
| Sign-in | Knows who each person is (email and password) | The database account |
| The database | Each person's details, readable only by them | The database account |
| Private files | Files people upload, visible only to their owner | The database account |
| The Claude doorway | Lets Claude use the app for a signed-in person; no business actions yet | Where the app lives online |
| The app's copy | All of the above as code, with its history of changes | The founder's GitHub |

The base app has no business features: no recipes, community, payments or customers. Every feature is added later, one journey at a time. Its pages today: sign in, home, your account, your files, a short guide. Read the list from the copy each time.

## Ownership

The founder owns the copy, the accounts and the data. The copy records which base version it came from so a later improvement can be offered as a change for their yes, never pasted over their work. Nothing from CoEngineers stays in it: no secret settings, local data, test records or history.

## Account steps (founder only, one at a time)

1. **GitHub.** Before the session: sign in, open https://github.com/coengineers/coengineers-learner-base, press Use this template, then Create a new repository, owner themselves, named after the app, Private. Never Fork: a fork of a public page is public. Then let Claude Code see the copy and the second brain (Install the Claude GitHub App, Only select repositories).
2. **Database.** Sign in to the learner-owned Supabase account created in Week 12 Do, check the organisation is theirs on the free plan, create the project in the agreed region (chosen once: moving later means moving the data). Let it generate the database password and keep it in a password manager. Create an access key named after the app and put it in Code's secret settings, never the chat.
3. **Sign-in settings.** Email sign-in on, confirmation on, site address and return addresses set to the test address (include the account page for password recovery). The default email sender is limited: confirm a message reaches the founder's own inbox, and leave delivery to other people "Not checked yet" until their own sender is set.
4. **Online home.** Sign in to the learner-owned Cloudflare account created in Week 12 Do, import the copy from GitHub for that one copy only, enter the build settings, add the settings by hand. Build settings: in the app, give the `online` block in `wrangler.jsonc` the app's own name in place of `my-app-test` (one change, for their yes); the command that builds and puts it online is `pnpm run online`. Three settings are typed once into the online home's own settings and are kept on every update: `APP_ORIGIN` (the test address itself), `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` (the database's address and its public key, from the database's own page). None is a secret and none is written in the app. Until they are set the test address opens but says it cannot connect; once set, its health and readiness answers are green. The database is set up by running the files in `supabase/migrations/` in date order (in the database's SQL editor if nothing else is to hand); never push the app's local sign-in settings to it. If the import is unavailable, use an access key from the "Edit Workers" template in Code's secret settings.
5. **Cards.** None needed. Never enter one for them.

## Checks

The app runs its own checks: tools present, formatting, rules about which parts may talk to which, types, tests, a build and a scan for leaked secrets and unsafe packages. Run them and say in one plain line what passed. Checks that need a local database may not run in Code on the web: say "Not run" with the reason, never "passed".

## Costs and limits

A small pilot fits the free plans. Take figures from the cost note in the copy and the founder's own account pages, with the date checked, never from memory. Look closely at 70% of any allowance, pause non-essential uploads at 90%, never switch on a paid plan as a fix. The free database has no automatic backups and no promise of availability, and a free project unused for about a week may pause (restore it from the database dashboard). Until a tested backup exists, the test address holds practice data only, not real members.
