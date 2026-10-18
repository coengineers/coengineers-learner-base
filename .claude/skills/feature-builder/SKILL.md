---
name: feature-builder
description: Builds one planned feature into the founder's app, in Claude Code on the web, one small step at a time, each tried by the founder before the next. Use in the Week 15, 16 and 17 labs.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.1"
  week: "W16"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Feature builder

Builds the agreed feature into the founder's own app, one small step at a time. Each step is checked and tried by the founder before the next. The founder decides what it does and whether it is right. In a lab, it hands the records back for the lab to save. On its own, save with `references/save-rules.md`.

Read the founder's `skills/feature-builder.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Where it runs

Claude Code on the web (claude.ai/code), on the founder's app. Read the second brain through the link to GitHub if the workspace has it; otherwise build from the plan the founder pasted. Follow `references/on-screen.md`: say "a change", "try it", "the test address"; never branch, commit or a change to how things are kept unless they ask. Never show version numbers, file lists or code.

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

- The agreed plan for this feature (`product/*-plan-<feature>.md`), required, and `product/PRD.md` for what waits.
- `product/app-map.md` (the test address) and `brand/DESIGN.md`.
- For a return visit, the latest check (`product/*-check-<feature>.md`).

## What you make

The feature, working on the founder's test address, built from the plan's steps and nothing else, with its own tests. The change waits for the founder's yes: they read it and press the green button. Nothing goes to a real address: that is Week 19.

## Steps

1. Read the plan and the app's own guide to adding a feature. Where they differ from `references/method.md`, the app's guide wins.
2. **Check the app is healthy first**: run its checks. If they fail, stop and say so in plain words; fixing that comes first, as its own change.
3. Say in one line what you will build and in how many steps.
4. For each step in order: build it in a safe copy, run the checks, then ask one question: "Try <one thing>. Does it look right?" If unsure, walk them through it in three lines: what to tap, what they should see, what changed for a member. Do not move on with "I do not know" except for work that changes nothing live.
5. When the last step is done, open the app's change for their yes yourself, without being asked, and give the founder its link. Never end with changes only pushed. Tell them what to read. The founder presses the green button when it is right; only promise an automatic update if the app map confirms it. Otherwise say "ask whoever set up your online home to update it".
6. Hand over to `feature-checker`: "Next, the whole journey gets checked as a member would."

## Truth rules

1. **Only what the plan says.** A "To be decided" is never guessed: leave that part unbuilt and name it.
2. **Checks are honest.** They pass after every step. Never skip, weaken or delete one. One the workspace cannot run is "Not run".
3. **Private stays private.** Everything private or shared has a second-member test and a signed-out test. Who is asking comes from their sign-in.
4. **Nothing live.** No real members' details, no live payment keys, no real purchase, nothing sent to anyone, no secret in the chat, the code or the second brain. Practice content is marked "Practice".
5. **Never rewrite history.** A change to how things are kept is a new step, run on practice data only.

## Limits

One step at a time. A step that fails after three tries stops: keep the safe copy, say what is stuck, mark that step "Stuck: <reason>" in the plan and offer another way. No more than two rounds of questions outside the step checks.

## Checks before you hand back

- Every step built is in the plan, and only those.
- Private things have both tests.
- The founder tried every step, and the checks passed or say "Not run".
- Screens use the app's brand settings and work on a phone and a laptop.
- British English, no em dashes; the founder heard no build words.

Hand the lab, as the one block to paste: the test address, what was built, what was left, the plan's steps marked "Built, <date>", and any new weak spot.
