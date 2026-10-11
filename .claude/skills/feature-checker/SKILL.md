---
name: feature-checker
description: Checks a built feature on the founder's test address as a member would, on a phone, including what must stay private, and re-checks earlier journeys. Use in the Week 15, 16 and 17 labs.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.1"
  week: "W15"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Feature checker

Walks the finished feature the way a member would, and says what worked, what did not and what was not checked. In a lab, it hands the record back for the lab to save. On its own, save with `references/save-rules.md`.

Read the founder's `skills/feature-checker.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Where it runs

Claude Code on the web (claude.ai/code), on the founder's app, right after `feature-builder`. Read the plan through the link to GitHub if the workspace has it; otherwise use what the founder pasted. Follow `references/on-screen.md`. Never show version numbers, file lists or code. Never ask the founder to edit settings, set a pretend time or start anything on their computer: set up whatever the check needs yourself. In a lab, never write the check record to the second brain: give its full text in the block the founder pastes back, and the lab saves it.

The session should hold two things: the founder's app and their second brain. Read the brand, logo files, plan and records from the second brain. If it is not in the session, ask the founder to add it (the + beside the app's name at the top of Claude Code) and wait; never ask them to paste the brand guide.

Before handing over, read the checks on the change (the green tick or red cross GitHub shows). If any is red, fix it first, including the app's own browser tests when your change altered words or pages they look for. Never hand over with red checks; if one cannot be fixed, say which and why in one line.

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

- The agreed plan for this feature (`product/*-plan-<feature>.md`) and its done test.
- The test address from `product/app-map.md`.
- Earlier plans and checks in `product/`: every earlier journey is checked again (Week 16 and 17).

## What you check

Use practice members only, made for the check and removed after.

1. **The main path**, start to finish, as the plan's steps say, at phone size.
2. **The done test**, word for word. Did a member finish without help?
3. **Something going wrong**: a wrong password, a lost connection, an empty list. What does a member see, and can they recover?
4. **What stays private**: a second member and a signed-out visitor each try to see or change what is not theirs. Each is refused.
5. **Earlier journeys**: run each again. Anything that used to work and now does not is the most important finding.
6. **Payments and access** (Week 17): pay or be added, get in, use it, lose access. The same sale twice lets nobody in twice. Not paid means not in. Use the chosen model from the plan. Membership cancellation stops renewal but keeps access to the agreed paid-through date. Pay-as-you-go grants only the bought item, session or uses, with the agreed consumption/expiry rule and no recurring charge. Test the agreed refund rule without removing unrelated purchases. If the model is absent, ask before testing; never assume membership. The founder checks only the payment page (it opens, shows the right price and what members get); nobody buys, cancels or refunds. Every step the founder does by hand is written down.
7. **Laptop size and keyboard**: quickly, after the phone.

## What you make

**`product/YYYY-MM-DD-check-<feature>.md`**, shown in the chat as a short list: each check with Passed, Did not pass or Not checked, and what was seen, in plain words. Then the verdict: ready for the founder's judgement, or what is left and who does it. It holds:

- the done test and whether it was met
- each check and what a member saw
- earlier journeys re-checked
- problems, biggest first, each with what a member would notice
- what was not checked, and why
- for Week 17, the by-hand steps

## Truth rules

- **Passed means seen.** Never mark a check passed that was not run. A check the workspace cannot run is "Not checked" with the reason.
- The founder decides whether it is right. You report; you do not call it done for them.
- Do not fix anything while checking. Offer to send a fault back to `feature-builder`.
- Nothing real: no real member, no real payment, nothing sent. Remove the practice members after.

## Checks before you hand back

- Every check in the plan is in the record, with what was seen.
- Every earlier journey shows as re-checked.
- The privacy checks were run as two different people.
- Problems say what the member would notice, not what the code does.
- British English, no em dashes.

Hand the lab, as the one block to paste: the record's full text, the verdict in one line, and any new weak spot.
