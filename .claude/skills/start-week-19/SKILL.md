---
name: start-week-19
description: Runs the CoEngineers Week 19 lab. The founder plans changes from member tests, makes and retests them, then puts the landing page and app live. Use when they type start week 19.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "3.0.2"
  week: "W19"
  course: "Ship"
  author: "CoEngineers"
---

# Week 19 lab: Make the changes and put it live

Read `references/lab-rules.md` first and follow its eight steps. If the installed reference files cannot be opened, read the same three files from the founder's approved app with `GitHub:get_file_contents` (`.claude/skills/start-week-19/references/`). Find the app from the founder's context or app map. If neither copy can be read, name the missing rules and stop before any write. This page gives the week's details. Use `feature-planner`, `feature-builder` and `feature-checker` for the agreed changes, then `go-live` to put the landing page and the app live at the free address. A few hours, in one or two sittings; the retests and go-live may need the second. The founder can resume with start week 19.

## Before you start

**Bring:** (the first reply opens "To have to hand:" with this, before any question) the Week 18 change list, the app's working address, someone to repeat the affected member steps, and a few hours across one or two sittings. A bought domain is not required.

Read the second brain's `product/app-map.md`, Week 18 member-test results and proposed changes, `product/PRD.md` (the Week 13 Plan), `brand/DESIGN.md` and earlier feature checks. Unfixed Week 18 problems are inputs to this lab. If results are missing, offer the Week 18 test or work from clearly named observations; never invent a result.

## Check-in

Read the Week 18 What happened notes. Distinguish proposed changes, accepted problems and support needs. An accepted problem is not a fix, and a done task is not proof of a working change.

## Decisions (two rounds at most)

1. **The change plan.** For each selected Week 18 problem, draft: what happened, what will change, what stays the same, and the observable repeat test. Prioritise harm to members. Agree a manageable first change; date the rest or record why a problem is accepted. Keep serious unresolved issues visible and joining closed.
2. **The repeat and the address.** Who repeats each affected journey, on which device and when. Ask whether to keep the free app address, connect a domain they already own, or buy one themselves. Recommend keeping the free address; the learner chooses. A domain is optional and never blocks the go-live: it can come later.

## Artifact

Build in Claude Code, the building tool (say it like that the first time, then just Claude Code). Tell the founder: open https://claude.ai/code, choose your app and your second brain from the Repo button at the bottom. Before the handover, look at the app for changes still waiting for their yes (`GitHub:list_pull_requests` on the app the app map names). If last week's is waiting, say so and ask them to approve it first or agree to build on top of it. Start the pasted handover with "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it." Then give them the skill sentence, with the text below it that the lab hands over: a line starting "Change only:" that names exactly what was agreed (name the tests that check those words too, if the words change); "Leave everything else as it is. Do not change my second brain. Set no reminders."; and "When you finish, end with these five lines for me to copy back: Built: / Left: / Checks: / Still waiting for my yes: / New weak spots noticed: (each one, or none)." Claude Code's copy of the skills can be older than these rules, so the pasted text must carry all of this. If what they paste back has no such five lines, say so and ask them to ask Claude Code for them. Say how they will see it: nothing is online until they press the green button on the app's change; only if the app map confirms updates are automatic, the test address updates after that. Otherwise say "ask whoever set up your online home to update it". When Claude Code has opened the change, they paste its hand-back block here and say "built"; the phone check is their step after the lab. If the block says the app already does this, say so, and use the lab to check it against the done test instead of calling it built. Read the block: say which change to approve, add any new weak spot to the notes and ask whether it becomes a task. This lab saves the notes; if Claude Code opened a change to the second brain, ask them to close it.

The sentence: "Plan the agreed Week 18 changes with feature-planner, implement them with feature-builder and retest them with feature-checker. Change only the items listed below." Include each observation, proposed change and repeat test. Hand over only the change cycle in this handover; the go-live is a separate handover, given only after the retests (see Put it live).

After the change is approved and the working address updates, the founder or named tester repeats each affected step. Ask for what they actually saw. Recheck the earlier journeys too. Show a Changes and retests page with: proposed, implemented but not retested, passed repeat, failed repeat, accepted with reason, or needs support. Record the check's source (practice copy, hosted address or real member); a simulated result stays labelled simulated. Nothing is Fixed until its repeat passes.

## Put it live

Once each agreed change has a repeat result, use `go-live` to put the landing page and the app live at the chosen address. This is part of the lab, not an extra: Launch checklist, confirmation and recovery emails, a privacy note the founder approves, a saved copy of members' details and a practised way back. Hand it over as its own bounded Code handover with the same five-line hand-back. The founder chooses the address:

- **Keep the free app address (the default):** copy the working address from the app map, open it securely, check sign-in and the main journey and record that this is the chosen address. No purchase.
- **Existing domain (optional):** confirm the learner owns it and can open its provider settings. Follow the records the provider shows, preserve existing email records and let the learner approve changes in their own account. Wait for secure connection status, check sign-in return links and the main journey, then record it. Keep the working address until these pass.
- **New domain (optional):** the learner checks availability and first-year and renewal cost, buys it themselves only if they choose, then follows the existing-domain route. Claude never buys a domain, enters card details or assumes a purchase. If it will not connect, keep the free address and bring the stuck step to the Week 20 drop-in.

Record anything not done as Not yet, with the reason; claim no hosted check that was not run. Invite nobody and open no joining until the checks and founder approval are complete. Keep the doors' date, or Not yet with a reason, separate from the address.

## Criteria

- Each agreed change answers a Week 18 observation.
- The plan says what success looks like before implementation.
- Implemented changes have a recorded repeat result, or say not retested yet.
- The landing page and the app are live at your chosen address, or each step not done says Not yet and why.
- The Launch checklist shows each check as Passed, Not yet, Planned or Your step.
- Earlier working journeys still pass, or the failure is recorded.
- Unresolved issues and support needs have an owner and next step.

## Records

Before any GitHub write, read `references/save-rules.md` and follow its five steps. Prepare and read back the notes on a new branch, then give the named comparison link with the verified branch, title and body. The founder puts the change forward there and saves it with the two green buttons. Never call `GitHub:create_pull_request` or refer to a form or Submit. The notes are prepared until the founder approves and the saved notes are read back. Read the saved notes before making tasks, and never repeat successful task writes on a retry.

- `product/YYYY-MM-DD-change-plan.md`, with the observations and agreed changes.
- `product/YYYY-MM-DD-change-retests.md`, with before/after, tester, date, source and actual result.
- `product/YYYY-MM-DD-launch-record.md` and `offer/YYYY-MM-DD-landing-page.md`, as `go-live` hands them back.
- `product/app-map.md` only if the chosen address or update method changed.
- `weekly/YYYY-MM-DD-week-19-changes.md`, including the address choice, what is live and drop-in needs.

## Tasks

- "Repeat <changed journey> with <name>": product, only if its repeat is still to do, due before the next lab.
- "Bring <stuck step> to the supported drop-in": product, only when support is needed, with the observed problem and the learner's chosen date. Do not create a domain purchase task if they chose the free address.

## Close

When you have done it, type /did-it. If support is needed, the close names the agreed drop-in task and date without claiming a booking.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
