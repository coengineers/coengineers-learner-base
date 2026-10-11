---
name: go-live
description: Puts the app and landing page on the founder's chosen address, with checks and a way back, separate from opening the doors. Use in the Week 19 lab, or for supported setup.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.2"
  week: "W19"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Go live

Takes the tested app from its test address to a real one, with the landing page beside it, and keeps "it is live" apart from "the doors are open". It takes a few hours of guided account steps, never days, and it is the longest sitting in the programme: say so at the start. In a lab, it hands the records back for the lab to save. On its own, save with `references/save-rules.md`.

Read the founder's `skills/go-live.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Where it runs

Claude Code on the web (claude.ai/code), on the founder's app. Read the second brain through the link to GitHub if the workspace has it; otherwise use what the founder pasted. Follow `references/on-screen.md`. Never show version numbers, file lists or code. Read `references/method.md` for the live side, the checks, backups and going back.

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

- `product/app-map.md`, `product/PRD.md`, the latest `product/*-change-plan.md` and `product/*-change-retests.md` (every serious problem must have a passed repeat in the retests, or be accepted with a reason in the plan), `offer/OFFER.md`, the one-page summary, `brand/DESIGN.md` and `business/` (name, who runs it, country, a privacy contact).
- The founder's answers in the lab.

## What you make

1. **The app and the landing page, live on the real address**, from one named, dated release. The live side has its own member data and keys, apart from the test side. The landing page comes from `offer-website-builder`, made for the real address.
2. **A privacy note and terms** as pages, marked "Draft for <name> to approve", written from what the app really keeps.
3. **The Launch checklist page.** One self-contained page in the founder's Claude account, in their brand: each check with what was checked, where, when and its status (Passed, Not yet, Planned or Your step), the address, how to go back, the costs, backups and the doors' date.
4. **`product/YYYY-MM-DD-launch-record.md`**: the same content, and the release name. The landing page's record is `offer/YYYY-MM-DD-landing-page.md` (from `offer-website-builder`).

## Steps

1. Read the inputs. Say in one line what you found, and stop if a serious problem in the change plan has no passed repeat in the change retests and is not accepted with a reason.
2. Agree the address. With none of their own, the free address where the app lives online works today; buying one is the founder's decision and payment. Never buy it.
3. Build the launch changes as one change waiting for their yes: the two pages, the error log on, the settings pointing at the real address, and the landing page.
4. **The six account steps, one at a time, waiting for "done"**, as a guided sitting: choose the free app address, a domain already owned, or a new domain the founder buys only if they choose; connect an owned domain only if chosen (preserve existing email records and verify secure connection, then sign-in return links; it can take a few hours, so keep the working app address meanwhile); put the app there with Claude Code, with the second free database project, its keys in the secret settings where the app lives and sign-in told the real address; set up the emails the app sends; add the short page on how members' details are kept safe; keep a saved copy of members' details. If a step will not work after one more try, mark it Not yet with the reason, carry on with any step that does not depend on it, and point them to the weekly drop-in. If the address will not connect today, go live on the nearest working address and record which and why.
5. Make the named release (for example "Version 1.0, <the date it goes live>") and put it on the real address. The test address keeps following the latest version.
6. Run the checks on the real address (`references/method.md`), with one made-up account, removed afterwards.
7. **Going back.** Once the app is online, give the exact steps to put the last good version back, in the order the founder would do them, and walk them through it once so the steps are practised, not guessed. Write down those steps, who decides, how long to try a fix first, and a drafted note to members. The first release has nothing earlier to go back to: then the practised step is putting up a short "back soon" page, and you say so. If the app is not online, write "To be written and practised when the app is online". Never write return steps that were not done.
8. **The doors.** Ask: open now, or on a date? Record only the founder's words. Never announce, invite or send anything.

## Truth rules

1. The founder presses go. Never buy an address, switch on a paid plan, switch payments to live, invite or announce.
2. Test and live stay apart. If a live payment key turns up, stop and tell the founder; never use it.
3. Passed means it ran on the real address. Never write "ready for members" while a check is open.
4. Only what is real: costs are figures or "Not yet measured"; backups say what is in place; the privacy note describes what the app actually keeps.
5. No password or key in the chat, the record or the second brain.

## Limits

The founder's own time is a few hours across the six account steps, with breaks; the rest carries on without them. At most two rounds of questions, each with a draft.

## Checks before you hand back

- The real address loads securely from the named release, with the landing page and the app.
- The checks were run and each status is honest.
- Going back is written, and the doors have their own date or "Not yet: <reason>".
- The page and the record agree.

Hand the lab: the real address, the release name, the page's link and each record's path and full text.
