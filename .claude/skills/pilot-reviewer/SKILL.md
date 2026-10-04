---
name: pilot-reviewer
description: Plans the founder's small paid pilot with a size, an end date, weekly measures and one change per round, sets up invitations, and reviews each round. Use in the Week 21 lab and each pilot week after.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.0"
  week: "W21"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Pilot reviewer

Plans the pilot, shows it on a page, and later reads each round and picks the one change. In a lab, it hands the records back for the lab to save. On its own, save with `references/save-rules.md`.

Follow `references/on-screen.md` in every page and message.

Read the founder's `skills/pilot-reviewer.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Inputs

- The task list (`CoEngineers CRM:list_contacts`, `get_contact`, `list_tasks`, `get_task`): the people who said yes or not now in Week 11, and, on a review, the "Pilot check-in" task comments and contact notes.
- `product/PRD.md`, the latest launch record, the weak-spots page, `offer/OFFER.md` and `brand/DESIGN.md`.
- On a review, the newest `product/pilot/*-pilot-plan.md`.
- The founder's answers in the lab. A number with no source is Unknown: ask, never guess.

## The first run: plan and page

1. **`product/pilot/YYYY-MM-DD-pilot-plan.md`**: how many members and how many weeks; the start and end dates; the price and how they pay; who is invited (first names only, linked from your task list); what you will measure each week (two or three, each with where the number comes from); one change per round at most; how you will ask members what they think; what would make you stop early; what counts as a good pilot.
2. **The Pilot page.** One self-contained page in the founder's Claude account, in their brand. Readable on a phone, no downloads. It shows the plan, the people (first names and status: invited, joined, not yet), a strip of weeks with one check-in each and one change per round, and this week's measures.
3. **Tasks for the lab to write**: "Invite <name> to the pilot" (sales, one per person, linked to the contact), and a weekly "Pilot check-in" (product). The founder sends each invitation. You send nothing.

## Later runs: the review

1. Read the check-in comments and contact notes for the round. Say in one line what you found.
2. Draft the round: the measures with the numbers the founder gave (or Unknown), what members said in their words, and what happened.
3. Offer the changes the evidence supports, biggest first. The founder picks **one**, with a reason. The others wait.
4. Write `product/pilot/YYYY-MM-DD-pilot-review.md`: the round, the numbers, the words, the one change, what waits and why, and how they will know it worked. Update the page.

## Truth rules

- A measure is a number the founder gave or the app really recorded. Never estimate one.
- Members' words are quoted word for word, first name only, from your task list or the founder.
- One change per round. A second change waits for the next.
- Nothing is sent, charged or invited by you.
- Anything simulated is labelled.

## Checks before you hand back

- A size, an end date and each week's measures are written.
- One change per round at most.
- The way of asking members is written.
- Each person invited has a task linked to their contact.
- The page and the record agree.

Hand the lab: the page's link, each record's path and full text, and the tasks to write.
