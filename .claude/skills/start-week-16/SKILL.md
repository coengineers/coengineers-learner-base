---
name: start-week-16
description: Runs the CoEngineers Week 16 lab. The founder builds the second feature without breaking the first, and checks both. Use when they type start week 16.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.3"
  week: "W16"
  course: "Ship"
  author: "CoEngineers"
---

# Week 16 lab: Next journey

Read `references/lab-rules.md` first and follow its eight steps. This page gives the week's details. The plan is made by the `feature-planner` skill, the build by `feature-builder` and the check by `feature-checker` (names for Claude; the founder hears "the plan, the build and the check"). About 30 minutes.

## Before you start

Find the founder's second brain (as the lab rules say). Read `product/PRD.md` (the second feature), the Week 15 plan and check, `product/app-map.md` and `brand/DESIGN.md`. If the first journey has no check record, send them to the Week 15 lab first.

**Bring:** (the first reply opens "To have to hand:" with this) the things they noted on their phone in Week 14 and what their Week 15 tester said, a view on what one member should never see of another, and a second email address to sign up with as another member.

## Check-in

Read the Week 15 task "Try <feature> with <name>". What that person said about the first journey is the first thing to protect.

From the Week 15 What happened section: whether the person finished it alone, and what they said.

## Decisions (two rounds at most)

1. **What "right" means for the second feature.** Its done test in one sentence, and what stays private between members. Draft both from the plan.
2. **The steps.** After the planner's draft: the steps, what each member sees, and what must not change in the first journey. One round of changes.

## Artifact

Build in Claude Code, the building tool (say it like that the first time, then just Claude Code). Tell the founder: open https://claude.ai/code, choose your app and your second brain from the Repo button at the bottom. Before the handover, look at the app for changes still waiting for their yes (`GitHub:list_pull_requests` on the app the app map names). If last week's is waiting, say so and ask them to approve it first or agree to build on top of it. Start the pasted handover with "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it." Then give them the skill sentence, with the text below it that the lab hands over: a line starting "Change only:" that names exactly what was agreed (name the tests that check those words too, if the words change); "Leave everything else as it is. Do not change my second brain. Set no reminders."; and "When you finish, end with these five lines for me to copy back: Built: / Left: / Checks: / Still waiting for my yes: / New weak spots noticed: (each one, or none)." Claude Code works from the copy of the skills kept in the app, which can be older than these rules, so the pasted text must carry all of this every time. If what they paste back has no such five lines, say so and ask them to ask Claude Code for them. Their job is to decide what it does and whether it is right. Say how they will see it: nothing is online until they press the green button on the app's change; only if the app map confirms updates are automatic, the test address updates after that. Otherwise say "ask whoever set up your online home to update it". When Claude Code has opened the change, they paste its hand-back block here and say "built"; the phone check is their step after the lab. If the block says the app already does this, say so, and use the lab to check it against the done test instead of calling it built. Read the block: say which change to approve, add any new weak spot to the notes and ask whether it becomes a task. This lab saves the notes; Claude Code opens no change to the second brain, and if it did, say so and ask them to close that one.

The sentence: "Build the second journey from my plan with the feature-builder skill, then check it and the first journey with the feature-checker skill." Hand over the agreed plan below it.

What they get is the new journey, working on the app's test web address. They try both journeys as two different members.

## Criteria

- The first journey still works.
- A member can finish the new one without help.
- What stays private is private.

## Records

- `product/YYYY-MM-DD-plan-<feature>.md`
- `product/YYYY-MM-DD-check-<feature>.md`
- `weekly/YYYY-MM-DD-week-16-next-journey.md`

## Tasks

- "Try <feature> with <name>": product, linked to their contact, due before your next lab. Someone who fits the members you want.

## Close

When you have done it, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
