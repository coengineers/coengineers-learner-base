---
name: start-week-17
description: Runs the CoEngineers Week 17 lab. The founder makes paying, getting in, using it and losing access work end to end, with the by-hand steps written down. Use when they type start week 17.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.1"
  week: "W17"
  course: "Ship"
  author: "CoEngineers"
---

# Week 17 lab: Payments and access

Read `references/lab-rules.md` first and follow its eight steps. This page gives the week's details. The plan is made by the `feature-planner` skill, the build by `feature-builder` and the check by `feature-checker` (names for Claude; the founder hears "the plan, the build and the check"). About 30 minutes.

## Before you start

Find the founder's second brain (`GitHub:search_repositories`, query `user:@me second-brain`). Read `product/PRD.md`, `offer/OFFER.md` (price and how members pay), the Week 15 and 16 records and `product/app-map.md`. If the second journey has no check record, send them to the Week 16 lab first.

**Bring:** their price and what members get, and where they take payments (their shop's payment page; if they take payment another way, such as by invoice, they say so and the lab works with that).

## Check-in

Read the Week 16 task "Try <feature> with <name>". Any fault they found is fixed before money goes near it.

From the Week 16 What happened section: whether they finished the new journey alone, and any fault found.

## Decisions (two rounds at most)

1. **Choose how customers pay.** Offer both **membership** (a recurring payment for an agreed period of access) and **pay-as-you-go** (one payment for a session, item, use or bundle). Draft a recommendation from the offer and ask the learner to choose; never assume membership. Confirm the price, what one payment buys, the payment page or invoice route, and anyone added by hand. This is the real payment-setup week; a Week 13 promise was not a processed payment.
2. **What starts and ends access, and the by-hand steps.** Membership: confirm the paid period and that cancellation stops renewal while access lasts to the paid-through date; do not assume a calendar month. Pay-as-you-go: confirm the quantity or entitlement, when it is used, any expiry and whether unused purchases remain. For either route confirm what a refund removes. Never apply membership cancellation to a one-off purchase or remove unrelated paid purchases. Draft the plan and every by-hand step for their chosen route, and wait for their yes.

## Artifact

Build in Claude Code, the building tool (say it like that the first time, then just Claude Code). Tell the founder: open https://claude.ai/code, choose your app, and add your second brain with the + button. Before the handover, look at the app for changes still waiting for their yes (`GitHub:list_pull_requests` on the app the app map names). If last week's is waiting, say so and ask them to approve it first or agree to build on top of it. Start the pasted handover with "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it." Then give them the skill sentence, with the text below it that the lab hands over: a line starting "Change only:" that names exactly what was agreed (name the tests that check those words too, if the words change); "Leave everything else as it is. Do not change my second brain. Set no reminders."; and "When you finish, end with these five lines for me to copy back: Built: / Left: / Checks: / Still waiting for my yes: / New weak spots noticed: (each one, or none)." Claude Code works from the copy of the skills kept in the app, which can be older than these rules, so the pasted text must carry all of this every time. If what they paste back has no such five lines, say so and ask them to ask Claude Code for them Their job is to decide what it does and whether it is right. Say how they will see it: nothing is online until they press the green button on the app's change; only if the app map confirms updates are automatic, the test address updates after that. Otherwise say "ask whoever set up your online home to update it". When Claude Code has opened the change, they paste its hand-back block here and say "built"; the phone check is their step after the lab. If the block says the app already does this, say so, and use the lab to check it against the done test instead of calling it built. Read the block: say which change to approve, add any new weak spot to the notes and ask whether it becomes a task. This lab saves the notes; Claude Code opens no change to the second brain, and if it did, say so and ask them to close that one.

The sentence: "Build payments and access from my plan with the feature-builder skill, then check the whole loop with the feature-checker skill." Hand over the chosen membership or pay-as-you-go model and its agreed entitlement, expiry and refund rules below it. Explicitly tell the planner, builder and checker to use those rules instead of any older monthly-membership default.

What they get is the whole loop working on the app's test web address: pay or be added, get in, use it, access ends. Nobody buys, cancels or refunds anything: the checks use the shop's sample messages. The founder only looks at the payment page, to see that it opens, shows the right price and says what members get. Claude never spends or charges anything.

## Criteria

- The chosen payment model buys the agreed access or uses, with the agreed end or refund rule.
- A duplicate payment notice never grants duplicate access or uses.
- The steps you do by hand are written down.
- The payment page opens, shows the right price and says what members get.

## Records

- `product/YYYY-MM-DD-plan-<feature>.md`
- `product/YYYY-MM-DD-check-<feature>.md`
- `weekly/YYYY-MM-DD-week-17-payments.md`

## Tasks

- "Check your payment page": product, due before your next lab. Done when it opens, shows the right price and says what members get. Nobody buys, cancels or refunds.

## Close

When you have done it, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.

## No purchase

Nobody buys, cancels or refunds anything in this lab, and no task or by-hand step is a test purchase. If earlier notes in the second brain mention a test purchase, leave it out and never mention a test purchase.
