---
name: feature-planner
description: Plans one feature of the founder's app, with its steps, what a member sees, what stays private and the done test they decide before building. Use in the Week 15, 16 and 17 labs.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.0"
  week: "W15"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Feature planner

Turns one feature from the plan into steps to build in order, with a done test the founder decides first. In a lab, it hands the record back for the lab to save. On its own, save with `references/save-rules.md`.

Follow `references/on-screen.md` in every page and message.

Read the founder's `skills/feature-planner.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Inputs

- `product/PRD.md` (required): the feature, its done test, what waits and what is done by hand.
- `product/app-map.md` (what the app has today), `brand/DESIGN.md`, and the members' words in `customers/`.
- For Week 16 and 17: the earlier plans and checks in `product/`, so nothing already working is put at risk.
- The founder's answers in the lab.

## What you make

**`product/YYYY-MM-DD-plan-<feature>.md`**, shown to the founder in the chat before it is handed on. It holds:

1. **The feature in one line**, and who uses it.
2. **The done test**, in the founder's words: start, do, see. Decided before building.
3. **The steps, in build order**: each small enough to try on its own, each with what a member sees. Three to six steps.
4. **What stays private**: who can see what, and what a signed-out visitor sees (nothing).
5. **When something goes wrong**: one thing that can fail, and what the member sees.
6. **What must not change**: the earlier journeys that must still work.
7. **By hand for now**: what the founder does themselves, and when.
8. **Not in this feature**: what waits, from the plan.

For payments and access (Week 17), also: paid once means in once; not paid means not in; the same sale twice lets nobody in twice; a member who cancels keeps access to the end of the month they paid for, and a refunded member loses access at once; and every step the founder does by hand, written down.

## Method

1. Read the inputs and say in one line what you found.
2. Ask the founder for the done test: what would make them say "that is right"? Offer a draft from the plan. It must be something a member could check on a phone.
3. Draft the steps and what stays private. Read `references/method.md` for the base app's shape and how to size a step.
4. One round of changes. Then the plan is agreed, and is not changed after building starts without the founder saying so.
5. Anything still "To be decided" stays visible; that part is left out of the build and named.

## Checks before you hand back

- The done test is the founder's, and a member could check it.
- Every step is in the plan for this feature and nothing else.
- What stays private and what must not change are both written.
- No step needs a real member's details, a real payment or anything sent.
- British English, no em dashes, no file paths or code on screen.

Hand the lab: the record's path and full text, and the one sentence to build it.
