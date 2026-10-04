---
name: uat-builder
description: Writes the script a fresh tester follows on the founder's app, grades every problem by how much it hurts and makes the test results page. Use in the Week 18 lab.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.0"
  week: "W18"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Member test builder

Makes the script a person who has never seen the app follows on their phone, records what happens, and grades each problem. In a lab, it hands the records back for the lab to save. On its own, save with `references/save-rules.md`.

Follow `references/on-screen.md` in every page and message.

Read the founder's `skills/uat-builder.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Inputs

- `product/PRD.md`, the plans and checks from Weeks 15 to 17, and `product/app-map.md` (the test address).
- `brand/DESIGN.md` for the page.
- The founder's notes from the test, in the tester's words. A step with no note is Unknown: ask, never guess.

## What you make

1. **The script.** Steps a member takes, in plain words, one action each, from opening the app to the last thing the plan promised: get in, find this week's job, do the main thing, see what stays private, and what happens when access ends. Under each step, what should happen. It never tells the tester how to do it, only what to achieve. Made for a made-up tester account, removed afterwards.
2. **The Test results page.** One self-contained page in the founder's Claude account, in their brand. Readable on a phone, no downloads. It shows: the tester (first name, how they fit the members you want, the date), each step ticked or crossed, every problem with its grade, and the fix-or-accept call for each. A problem is "Fixed" only after the tester has repeated that step.
3. **`product/YYYY-MM-DD-member-test.md`**: the same content as the page, with quotes in the tester's words.

## Grades

- **Serious**: the member cannot do what they came to do, or something private is exposed, or money and access are wrong.
- **Annoying**: they get there, but stumble, wait or are unsure.
- **Cosmetic**: it looks wrong and gets in nobody's way.

## Method

1. Read the plan and the checks; draft the script from the promised journeys. The founder changes it.
2. The tester follows it while the founder watches and writes down what happened at each step, in the tester's words. The founder does not help. Before drafting results, ask for the tester's words for each step. A missing note stays Unknown, including on a simulated test. Earlier checks and earlier tester notes are not results of this test: keep them separate. Never fill a step with what the plan says should happen or assign an earlier fault to a tester who did not report it. A simulated result needs the founder's explicit simulated note too.
3. Draft each problem and its grade from the notes. The founder corrects the grades.
4. For each serious or annoying problem: fix or accept, with a reason. Every serious one is fixed or accepted with the reason written. Fixes are made in Claude Code as in Week 16.
5. Nothing is marked fixed until the tester repeats that step and it works. Until then it reads "Fix made, not re-tested".
6. Build the page, show it, one round of changes.

## Checks before you hand back

- A fresh tester (someone who had not seen the app) followed the script.
- Every problem has a grade, from the notes.
- The worst are fixed or accepted, each with a reason.
- Nothing reads Fixed without a re-test.
- The page and the record agree. No tester is described doing anything that is not in the founder's notes.

Hand the lab: the page's link and each record's path and full text, and the problems to turn into tasks, one line each.
