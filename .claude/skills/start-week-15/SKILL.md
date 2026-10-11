---
name: start-week-15
description: Runs the CoEngineers Week 15 lab. The founder plans, builds and checks the first feature of their app and judges whether it is right. Use when they type start week 15.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.2"
  week: "W15"
  course: "Ship"
  author: "CoEngineers"
---

# Week 15 lab: First journey

Read `references/lab-rules.md` first and follow its eight steps. This page gives the week's details. The plan is made by the `feature-planner` skill, the build by `feature-builder` and the check by `feature-checker` (names for Claude; the founder hears "the plan, the build and the check"). About 30 minutes.

## Before you start

Find the founder's second brain (`GitHub:search_repositories`, query `user:@me second-brain`). Read `product/PRD.md` (the Week 13 Plan: the first feature and its done test), `product/app-map.md` and `brand/DESIGN.md`. If there is no plan, send them to the Week 13 lab first.

**Bring:** their phone, the three notes from Week 14 and the Week 13 Plan. Its done test is the sentence inside that Plan describing how they will know a feature works; it is not another document to find.

## Check-in

Read the Week 14 task "Open the app on your phone and note three things". Any note about the first feature goes into the plan.

From the Week 14 What happened section: the three things they noticed on their phone.

## Decisions (two rounds at most)

1. **What "right" means.** The first feature's done test in one sentence a member could check. Draft it from the Week 13 Plan. It is decided before anything is built.
2. **The steps.** After the planner's draft: the steps in order, what a member sees at each and what stays private. One round of changes.

## Artifact

Build in Claude Code, the building tool (say it like that the first time, then just Claude Code). Tell the founder: open https://claude.ai/code, choose your app, and add your second brain with the + button. Before the handover, look at the app for changes still waiting for their yes (`GitHub:list_pull_requests` on the app the app map names). If last week's is waiting, say so and ask them to approve it first or agree to build on top of it. Start the pasted handover with "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it." Then give them the skill sentence, with the text below it that the lab hands over: a line starting "Change only:" that names exactly what was agreed (name the tests that check those words too, if the words change); "Leave everything else as it is. Do not change my second brain. Set no reminders."; and "When you finish, end with these five lines for me to copy back: Built: / Left: / Checks: / Still waiting for my yes: / New weak spots noticed: (each one, or none)." Claude Code works from the copy of the skills kept in the app, which can be older than these rules, so the pasted text must carry all of this every time. If what they paste back has no such five lines, say so and ask them to ask Claude Code for them. Their job is to decide what it does and whether it is right. Say how they will see it: nothing is online until they press the green button on the app's change; only if the app map confirms updates are automatic, the test address updates after that. Otherwise say "ask whoever set up your online home to update it". When Claude Code has opened the change, they paste its hand-back block here and say "built"; the phone check is their step after the lab. If the block says the app already does this, say so, and use the lab to check it against the done test instead of calling it built. Read the block: say which change to approve, add any new weak spot to the notes and ask whether it becomes a task. This lab saves the notes; Claude Code opens no change to the second brain, and if it did, say so and ask them to close that one.

The sentence: "Build the first journey from my plan with the feature-builder skill, then check it with the feature-checker skill." Hand over the agreed plan below it.

What they get is the journey, working on the app's test web address. Trying it as a member on their phone comes after the change is approved. If the feature is already in the app, say so, build nothing, and use the lab to check it against the done test instead.

## Criteria

- A member can finish it without help.
- It matches the done test in the Week 13 Plan.
- Checked on a phone.
- You decided what "right" means before it was built.

## Records

- `product/YYYY-MM-DD-plan-<feature>.md`
- `product/YYYY-MM-DD-check-<feature>.md`
- `weekly/YYYY-MM-DD-week-15-first-journey.md`

## Tasks

- "Try <feature> with <name>": product, linked to their contact, due on a day they choose, earlier than your next lab, because the next lab needs the result sooner. Someone who fits the members you want.

## Close

When you have done it, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
