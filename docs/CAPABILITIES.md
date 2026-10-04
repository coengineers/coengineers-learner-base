# Capability and exclusion contract

| Capability                         | Why it belongs                                                         | Replacement boundary                           |
| ---------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------- |
| Identity and session recovery      | Every private app needs verified users                                 | Supabase Auth adapter; browser identity client |
| Minimal profile                    | Demonstrates an actor-owned persistence path without a business domain | Account application port                       |
| Private files                      | Demonstrates owned storage and bounded uploads                         | File-store application port                    |
| Typed config and contracts         | Prevents invalid input crossing trust boundaries                       | Zod boundary schemas                           |
| Errors, request IDs and readiness  | Makes failure diagnosable without exposing private values              | HTTP middleware and provider adapter           |
| Accessible shell and feedback      | Gives learners usable pages from the start                             | UI primitives, tokens and feature screens      |
| Authenticated system MCP           | Establishes a safe Claude integration seam                             | MCP transport; no product tools                |
| Migrations, tests and provisioning | Makes a change repeatable and reviewable                               | Versioned source and local/CI commands         |

No business-specific pages, recipes, videos, payments, teams, fabricated contacts or learner-specific schema. Course content stays in the course platform. This application has no runtime dependency on it.

Files are private, restricted to approved formats, limited to 2 MB and downloaded as attachments. The current list shows up to 100 files. The browser never submits an owner ID for profile or file operations.

Pending hardening before release: durable quota enforcement/alerts, audit-event adapter, deployment environments and backup/recovery tooling.
