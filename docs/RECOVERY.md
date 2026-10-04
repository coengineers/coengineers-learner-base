# Recovery: local proof and production limits

## Verified local drill

On 20 September 2026, `scripts/recovery-drill.mjs` completed a real backup/reset/restore against the isolated rc.2 fixture, Supabase project `learner-e2f038ec86`. It took 23 seconds for the complete seeded drill, which is not a hosted recovery-time guarantee.

The drill:

1. Refused the canonical project, missing confirmation, non-loopback API, unexpected project identity, non-candidate copy, unfamiliar email domains or pre-existing storage objects.
2. Created a synthetic account, saved its profile and uploaded a known private text file.
3. Exported authentication and application data with `pg_dump`; saved file bytes separately with a SHA-256 digest. A database dump alone cannot recover object contents.
4. Reset only the confirmed fixture. Verified that accounts, profiles and storage metadata were empty. Versioned migrations rebuilt application tables, RLS policies and the private bucket.
5. Restored identity/profile data transactionally, then signed in using the original password and confirmed the same account ID and profile name.
6. Re-uploaded the backed-up file through the authenticated owner's storage client and compared its downloaded SHA-256 digest.
7. Verified that the original synthetic reviewer could also sign in, but could not read the restored account's profile or file. Anonymous file access remained denied.
8. Removed the successful drill's synthetic account and file. Retained private backups for inspection, outside Git.

The first attempt failed because the local `postgres` role does not own provider authentication tables. The corrected drill restores through `supabase_admin` inside the validated local Docker container. The password is taken from that container's environment without printing or passing its value through command arguments. The complete drill was repeated successfully; the failed attempt is not counted as a pass.

## Reproduce safely

This is a destructive test harness, not a general backup utility. Use only a separately provisioned, disposable synthetic candidate fixture. Never use it on a learner's working business copy, even if that copy happens to pass the guards.

Start that fixture's Supabase services, run its local setup, then from the canonical source run:

```sh
node scripts/recovery-drill.mjs /absolute/path/to/synthetic-fixture learner-0123456789 --confirm-synthetic-reset
```

Replace both example arguments with the actual fixture path and its `project_id`. The explicit project argument must match its configuration and Docker label. The script refuses the canonical preview's project and API port. Four negative-control tests cover missing confirmation and invalid/canonical project arguments.

The fixture's `.local/recovery-<timestamp>/` directory contains sensitive SQL data, including password hashes and authentication records. The directory is created with mode 0700 and files with 0600. Do not publish it, attach it to review, or move it into source control. Only the sanitised `.local/recovery-result.json` may be copied into review evidence after inspection. Keep private backups until recovery is verified; then apply an explicit retention policy. Test records from a failed attempt may remain in the disposable fixture.

## What still needs production proof

This demonstrates local data and file recovery for the current baseline schema, not full hosted disaster recovery. It does not prove recovery of provider settings, OAuth credentials/callbacks, encryption keys, custom roles, new product schemas, scheduled/off-site backups or a different provider/version. The script intentionally has no hosted mode.

Before a pilot stores real data, provide a reviewed production procedure that covers:

- The schema and migration version, identity/app data, object bytes and metadata, provider configuration and separately protected secrets.
- Encrypted off-site storage, retention, least-privilege access and restoration into an isolated destination.
- Actual scheduled exports and freshness alerts before claiming a 24-hour recovery point.
- A timed hosted drill with sign-in, ownership, file integrity and representative browser checks before claiming a four-hour recovery objective.
- A way to stop writes during a coherent backup/restore and an explicit decision on session revocation/key rotation after an incident.

Supabase's [official backup/restore guidance](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore) distinguishes roles, schema and data exports and calls out provider-specific migration requirements. Consulted 20 September 2026. The local container technique here must not be assumed to work unchanged on hosted Supabase.
