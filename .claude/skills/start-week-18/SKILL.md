---
name: start-week-18
description: Runs the CoEngineers Week 18 lab. A fresh tester follows a script on the founder's app, and every problem is graded by how much it hurts. Use when they type start week 18.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.0"
  week: "W18"
  course: "Ship"
  author: "CoEngineers"
---

# Week 18 lab: Test as your members would

Read `references/lab-rules.md` first and follow its eight steps. This page gives the week's details. The script and the results page are made by the `uat-builder` skill (say "the test script" to the founder). About 30 minutes.

## Before you start

Find the founder's second brain (`GitHub:search_repositories`, query `user:@me second-brain`). Read `product/PRD.md`, the Week 15 to 17 records and `product/app-map.md`. Ask who the fresh tester is: someone who has not seen the app and fits the members you want, with a phone. If no journey is built, send them to the Week 15 lab first.

**Bring:** one person who has not seen the app, with a phone and thirty minutes this week.

## Check-in

Read the Week 17 task "Check your payment page". Note any fault it showed.

From the Week 17 What happened section: whether the payment page opened, showed the right price and what members get, and anything they would do by hand.

## Decisions (two rounds at most)

1. **The tester and the script.** After the builder's draft script (the plan's journeys, step by step, with what should happen): confirm the steps and the tester.
2. **The grades.** For each problem the tester hit, the founder chooses serious, annoying or cosmetic, and fix or accept. Draft the grades from what happened.

## Artifact

The tester follows the script on their phone while the founder watches and notes what happened at each step, in the tester's words. Ask for those notes before drafting any results; an unreported step stays Unknown. Keep earlier tests separate and never assign their problems to a new tester. Simulated results need explicit simulated notes from the founder. Nothing is fixed during the test.

What they get is the Test results page: each step ticked or crossed, every problem with its grade, and the fix-or-accept call. Fixes are made later in Claude Code, the building tool, as in Week 16. Nothing shows as fixed until the tester repeats that step.

## Criteria

- A fresh tester followed the script.
- Every problem has a grade.
- The worst are fixed or accepted with a reason.
- Nothing is marked fixed until re-tested.

## Records

Before any GitHub write, read `references/save-rules.md` and follow its five steps. Prepare and read back the notes on a new branch, then give the named comparison link with the verified branch, title and body. The founder puts the change forward there and saves it with the two green buttons. Never call `GitHub:create_pull_request`, refer to a form or Submit, or describe an already opened change as still needing to be put forward. The notes are prepared until the founder approves and the saved notes are read back. Read the saved notes before making tasks, and never repeat successful task writes on a retry.

- `product/YYYY-MM-DD-member-test.md`
- `weekly/YYYY-MM-DD-week-18-member-test.md`

## Tasks

- "Fix or accept <problem>": product, one per serious or annoying problem, due before your next lab.

## Close

When you have done it, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
