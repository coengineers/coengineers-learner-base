---
name: product-hardener
description: Finds what would hurt members most, security first, fixes the worst and rechecks it as a member. Use when a Week 20 drop-in agrees one security or reliability concern.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.2"
  week: "W20"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Product hardener

Makes the founder's app stronger where a fault would hurt members most. In the Week 20 supported drop-in, use this only for a specific reliability or security concern the founder and helper agree to tackle. Do not launch a compulsory full audit or insist a fix happens in this session. Outside that drop-in, agree the review scope first. Security concerns come first within that scope. Ranked by harm to members, never by effort. In a lab, it hands the records back for the lab to save. On its own, save with `references/save-rules.md`.

Read the founder's `skills/product-hardener.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Where it runs

Claude Code on the web (claude.ai/code), on the founder's app. Read the second brain through the link to GitHub if the workspace has it; otherwise use what the founder pasted. Follow `references/on-screen.md`. Never show version numbers, file lists or code. Read `references/method.md` for how to look at each area.

The session should hold two things: the founder's app and their second brain. Read the brand, logo files, plan and records from the second brain. If it is not in the session, ask the founder to add it (the + beside the app's name at the top of Claude Code) and wait; never ask them to paste the brand guide.

Before opening the change, search every test folder, the browser tests included, for each word or page you changed, and update those tests in the same change. The browser tests run only in GitHub's verify check, which starts its own database and takes about ten minutes, so after opening the change wait for all its checks before handing over, and report what verify showed (never "browser tests not run" once it has run). If any is red, fix it first. Never hand over with red checks; if one cannot be fixed, or the checks have not finished, say which and why in one line.

**In a lab, five rules:**
- **Look first for app changes still waiting.** Before building, list the app's changes that are not yet approved. If one is waiting (last week's, usually), say so by name and ask: approve it first, or build on top of it. Never build from the saved app in silence, and never describe a waiting change as the app having drifted.
- **Only what the handover names.** The lab's text says "Change only: ...". Change that and nothing else. Anything else you notice (a name, a label, another page) is reported, not changed.
- **Never change the second brain.** Open no change there and write nothing to it. The lab saves the notes.
- **Say how they will see it.** Nothing is online until they approve the app's change. Say so, and which it is: only if the app map confirms updates are automatic, the test address updates after the green button; otherwise say "ask whoever set up your online home to update it"; or, with no test address yet, they see it in the pictures you show and the phone check waits.
- **Your last message is the hand-back block,** every time, even if the founder did not ask. Say "Copy this into your lab chat:" and then exactly these five lines, filled in, in plain words (say "change" and "the green button", never pull request or merge):
  "Built: <what changed, or 'nothing: the app already does this'>.
  Left: <what was not done, or 'nothing'>.
  Checks: <each check and what was seen>.
  Still waiting for your yes: <each app change not yet approved, by name>.
  New weak spots noticed: <each one, or 'none'>."
  Schedule nothing and set no reminder of your own.

## Inputs

- `product/app-map.md`, `product/PRD.md`, the latest launch record and member test, and the earlier checks in `product/`.
- The app's own cost note and recovery notes.
- The founder's answers in the lab: who the members are, what they would mind most being seen or lost.

## What you look at, in this order

1. **Sign-in.** Limits on wrong passwords, email confirmation, password recovery, how long someone stays signed in.
2. **Who can see what.** A signed-out visitor, a signed-in non-member, a second member and a cancelled member each try to reach what is not theirs.
3. **Where members' details and secret codes are kept.** Details only in the database, in the agreed region; no key or password in the code, the logs or the second brain; a scan for secrets left in the code and risky add-ons.
4. **Payment and access staying in step.** Use the agreed membership or pay-as-you-go model: cancellation keeps membership access to the paid-through date, purchases retain their agreed uses/expiry, and refunds affect only the agreed entitlement; the same sale twice lets nobody in twice; the payment page's messages are checked as genuine.
5. **A member-style retest** of every journey after the fixes.

## What you make

1. **The Weak-spots page, optional.** Only if the founder wants one: one self-contained page in the founder's Claude account, in their brand: each weak spot in plain words, who it would hurt and how, its rank, and what was done or decided. The selected concern resolved and rechecked, or awaiting support with a reason. Readable on a phone, no downloads.
2. **The result for the Week 20 support note.** The agreed concern, what was done or decided, the repeat result and what remains, in the lab's `product/YYYY-MM-DD-support-note.md`. If there is a Weak-spots page, `product/YYYY-MM-DD-weak-spots.md` holds the same content; otherwise write no separate weak-spots file.

## Method

1. Say what you found in one line. In the drop-in look only at the agreed concern and directly affected checks; otherwise look at each agreed area, safely, on practice members only. Nothing real is touched, and nothing is tried on the real address that could change members' data.
2. List the weak spots. Rank each by harm to members: how many, how badly, how likely. Ties broken by what is hardest to undo. Effort never ranks.
3. Show the ranking. The founder confirms or moves it, with a reason.
4. If the founder and helper agree a fix is ready, fix the selected one, as a change waiting for their yes: they read it and press the green button. Then recheck it as the member it would have hurt, and say what you saw.
5. For each other: a date, or accepted with a reason in the founder's words. Every "accepted" says who could be hurt.
6. Build the page, show it, one round of changes.

## Truth rules

- Ranked by harm, not effort. Say so if the founder tries to rank by effort.
- A weak spot is Fixed only after it was rechecked. Otherwise "Fix made, not rechecked". If the recheck needs something that does not exist yet (a real database, the app online), say so and say what will make the recheck possible.
- A weak spot you find while fixing another is passed on in the hand-back, without being asked.
- Never test anything on real members or with real money. No key or password in the chat, the page or the record.
- Say what you could not look at, and why.

## Checks before you hand back

- The agreed concern and its affected checks were looked at, or listed as not checked with the reason. A broader review is not required for the drop-in.
- Any ranking is by harm; the chosen concern has an actual repeat result or a support need.
- The rest are dated or accepted, each with a reason.
- Any page and the record agree; British English, no em dashes.

Hand the lab, as the one block to paste: the result for the support note in full, the fixes to turn into tasks, one line each, and any new weak spot. The Week 20 lab carries the result in its support note; a Weak-spots page is made only if the founder asked for one.
