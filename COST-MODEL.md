# Cost model: a bounded £0 pilot

Provider documentation checked 20 September 2026. This page is a plan for staying inside the free plans, not a receipt.

| Service                          | Free allowance                                                                                                       | Ownership and stop condition                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Cloudflare Workers Static Assets | Free, unlimited static requests                                                                                      | Learner account; use workers.dev hostname                                                              |
| Cloudflare Workers Free          | 100,000 dynamic requests/day; 10 ms CPU/request                                                                      | Remain on Free; exceeded limits can cause request failures; local latency does not prove hosted CPU    |
| Supabase Free                    | Two active projects; 500 MB database/project; 1 GB storage; 5 GB uncached egress plus 5 GB cached egress; 50,000 MAU | Learner-owned free organisation; no automatic backups or SLA; inactive projects may pause after a week |
| GitHub Free                      | Private repositories; 2,000 Actions minutes/month, 500 MB Actions storage                                            | Learner-owned repo/account; verify account's actual allowance and stop-spend budget before enabling CI |
| GitHub OAuth                     | No transactional email required by the app                                                                           | Learner creates OAuth app and owns callback configuration                                              |

Sources: [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [static asset billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [Supabase pricing](https://supabase.com/pricing), [Supabase billing](https://supabase.com/docs/guides/platform/billing-on-supabase), [GitHub included usage](https://docs.github.com/en/billing/reference/product-usage-included), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

## Starting envelope

20 people using the pilot, 2 MB maximum per file, at most 100 files returned in a view. Budget initially for 200 MB files, 100 MB database, 1 GB uncached egress/month and 10,000 dynamic requests/day. These are conservative operating targets, not enforced account quotas. Repeated polling, external MCP clients, bot traffic and downloads count too. Review provider usage weekly during a pilot.

At 70% of any included quota, investigate and reduce nonessential traffic. At 90%, stop nonessential uploads and acquisition until an owner decides whether to reduce usage or upgrade. Automatic quota enforcement and real alert tests remain pending. Do not claim the application currently prevents every provider overage.

GitHub supports usage notices at 90% and 100%. Set a budget that stops usage at the included allowance and verify it on the learner account. Keep CI on Linux, cancel superseded runs, bound job duration, and retain no private test traces as public artefacts.

Stay on Workers Free and Supabase Free. Never enable a paid plan as a repair step without the owner's decision. R2 is optional later, not required for the strict zero-payment-method path: local encrypted backup storage is possible, but needs an actual backup schedule and restore drill. Railway is a later Node-hosting alternative, not needed here.

## Failure and recovery

When the API cannot reach a provider, private actions fail with a safe message and the browser offers retry. A failed profile save retains the typed name. An expired session must reauthenticate. Supabase pausing requires the owner to restore the project through its dashboard and verify sign-in, rows and files. A daily Cloudflare request limit requires reducing load and waiting for the reset or deliberately upgrading.

Free services offer no availability guarantee. A database-only export omits file content and external OAuth credentials. Recovery documentation must identify all components and prove a full restore before release.

## Upgrade decisions

Paid hosting is justified by measured Worker CPU/traffic, larger database/storage/egress, more than two hosted projects, managed backups, availability commitments or production email. A custom domain is optional. The free OAuth route must remain available without one.

Private-repository branch protections may require a paid GitHub plan. Do not promise both server-enforced protected branches and an unconditional free private repository. Use documented human-reviewed PRs plus local verification on the free path, and record that enforcement limitation. Verify the account plan before enabling paid protection features.

## Evidence still required

Actual plan-level receipts, provider-generated hostname, OAuth, storage and RLS on hosted projects, quota alerts, stop-spend settings, pause recovery, Workers CPU and full backup recovery. No cloud costs or live deployment have been incurred by this build.
