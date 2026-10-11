---
name: product-prd-builder
description: Sorts the offer into what the base app does, what is new in version 1 (three features at most) and what is by hand, and writes the plan page. Use in the Week 13 lab.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.1"
  week: "W13"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Product plan builder

Makes the plan for version 1 of the founder's app: the smallest version worth having, and why the rest waits. In a lab, it hands the records back for the lab to save. On its own, save with `references/save-rules.md`.

Follow `references/on-screen.md` in every page and message.

Read the founder's `skills/product-prd-builder.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Inputs

- `offer/OFFER.md` (required), the latest decision in `offer/`, `business/one-line.md`, `customers/` conversations, `product/` test notes, `product/app-map.md`, an earlier `product/PRD.md` and `brand/DESIGN.md`.
- The founder's answers in the lab. If a file is missing, say so in one line and work from what they tell you now, marked "Told by the founder, <date>".

## What you make

1. **`product/PRD.md`**, the plan, kept up to date. If one exists, update it, keep each feature's status and add a dated line under What changed. Headings, in order: Who it is for; What version 1 does (the features); Already in the base app; Done by hand for now; What waits, and why; Open questions; What changed. Later weeks read these headings, so never rename them.
2. **The Plan page.** One self-contained page in the founder's Claude account, in their brand from `brand/DESIGN.md` (`references/house-style.md` if none). Readable on a phone, no downloads. It shows the offer's lines dropping into three trays (already in the base app, new in version 1, by hand for now), the features each with its done test, and what waits with why.

## Method

1. Read every line of the offer's "What they get". Place each one once: in the base app (sign-in, a profile, private files, the Claude doorway), new in version 1, or by hand for now (things one person does well each week: writing recipes, filming, answering questions, adding founding members). Read `references/method.md` for the base app's limits and the order of features.
2. Choose **three features at most**, easiest first, one a week from Week 15, each leaning only on those before it. The first must be worth using alone. If more is asked for, offer two doors: swap it for something the same size, or park it under What waits.
3. For each feature write the done test: one sentence a member could check on a phone ("Start: signed in, on Home. Do: open this week. See: the recipe, video and job"). A test the founder cannot check is not a test.
4. For each thing that waits, write why and when it might come back.
5. Payments stay the shop's link, and anyone added by hand stays by hand, unless the offer says otherwise. Write it under Done by hand.
6. Draft, show the founder the trays, let them move lines, then build the page. One round of changes.

## Labels (say them on the page, once)

- **Decided** (you have proof): a source or this lab shows it, and the source is named. A choice that is only the founder's to make counts once they make it. On a page, say only "you have proof".
- **Testing** (you are trying it): an assumption. **Unknown**: nothing answers it yet.

The plan is "Draft" until the founder says "agreed". No decision on the offer: say so in one line and write it as a draft. Quotes are word for word with their source; none on file reads "No customer words gathered yet".

## Checks before you hand back

- Every offer line is placed exactly once.
- No more than three new features, none rebuilding sign-in, profiles, files or the Claude doorway.
- Each feature has a done test a member could check.
- What waits is written, each with a reason.
- Headings match; the page and record agree; nothing invented.

Hand the lab: the page's link and each record's path and full text.
