# ADR 001: an independent foundation for each business

Decision date: 20 September 2026. Implementation in progress; deployment and human acceptance pending.

## Contract

Every learner gets an independent private repository. This base supplies sign-in, session restoration, profile settings, private files, accessible navigation, health checks, typed boundaries and verification. It contains no customers, sales, recipes, membership, payments or invented business evidence. Each business adds its reviewed product requirements during Ship.

## Evidence reviewed

The base app supplies shared account and file behaviour without any business-specific data. Each learner keeps an independent private copy with separate provider accounts and credentials. Course content and the coding workspace are separate from the running app. Neither must be available for members to use the app.

## Options

| Option                             | Cost and complexity                                                                  | Decision                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------- |
| React + Hono Worker + Supabase     | Static delivery, stateless API, managed identity and Postgres; two provider accounts | Selected, subject to deployment proof         |
| Existing Node/Railway scaffold     | Familiar but always-on paid runtime and product-specific data                        | Optional future adapter, not the free default |
| Cloudflare D1 with custom identity | Fewer providers but identity/recovery would become owned security work               | Rejected for this baseline                    |
| Full-stack SSR framework           | Useful for public content/SEO, adds server rendering to a mostly private app         | Revisit when a product needs it               |

Use React/Vite, TanStack Router/Query, Hono, tRPC, Zod, Supabase Auth/Postgres/Storage and Drizzle schema/migrations. The Worker serves static assets and API on one origin in the reference deployment. These remain separate source tiers, and may be deployed separately later. One origin removes unnecessary CORS configuration for beginners. Database access uses the actor's JWT through the Data API: no service-role key in the application runtime.

Product modules have domain, application, infrastructure and transport layers. Domain knows only its own rules; application owns ports; infrastructure implements them; transport validates and maps. The composition root wires them. The browser imports shared contracts, not server implementations, except an erased tRPC router type. Automated dependency checks enforce this, with negative-control tests for forbidden imports. TypeScript is pinned to 5.9.3 because this checker uses its compiler API; the initially attempted 7.0.2 package did not provide the required API. A compiler upgrade must preserve or deliberately replace this enforcement, not silently bypass it.

Local development uses genuine local Supabase, including email capture for recovery, rather than fake browser-only authentication. The app offers email/password creation, sign-in and recovery in both local and hosted presentation; members do not need GitHub accounts. Hosted email needs verified confirmation/redirect settings and suitable production SMTP. Local email capture does not prove real delivery. GitHub access for the founder’s coding workspace is a separate requirement. A local-only synthetic account is explicitly labelled.

## Quality attributes and operational limits

Initial pilot assumption: 20 active people, one region, files up to 2 MiB, bounded lists of 100 files. Targets: authenticated p95 under 500 ms on the recorded local machine at 20 requests/s for 10 minutes, 100 maximum concurrent requests, below 1% errors. This is a comparison baseline, not a hosting guarantee. Hosted CPU must separately fit Workers Free. A failed dependency returns a safe retryable failure, never another user's data.

Availability: no free-provider SLA; detect outages through readiness and provider dashboards. Recovery target: restore a tested daily export within four hours; at most 24 hours of lost data only when daily exports actually run. Security: every private operation verifies identity and ownership; cross-user database and storage tests; no secrets in client artefacts. Maintainability: one command verifies boundaries, types, tests, migrations, build, secrets and dependencies.

First bottlenecks are database/egress quotas, auth round trips and Worker CPU. Investigate at 70% quota, stop nonessential uploads at 90%, do not automatically enable billing. Index actor-owned queries. Upgrade Postgres/Storage capacity in place; use CDN delivery for deliberately public media, never private files. Add a durable queue behind an owned application port for slow work. Extract a service only for measured independent scaling or isolation. Profile before changing providers.

## Review gates

Both GitHub checks must pass on the reviewed change before it is approved. The canonical template is coengineers/coengineers-learner-base; learners take private copies by its README. Each copy needs its own provider setup and a free hosted test. Local checks cannot prove hosted sign-up, email delivery, recovery or member access. The owner must complete those checks before inviting members, including provider plans, quotas and a tested backup.

References: https://developers.cloudflare.com/workers/best-practices/workers-best-practices/ ; https://developers.cloudflare.com/workers/platform/pricing/ ; https://supabase.com/docs/guides/local-development/cli/getting-started . Consulted 20 September 2026.
