---
name: start-week-20
description: Runs the CoEngineers Week 20 lab. The founder ranks what would hurt members most, security first, fixes the worst and rechecks it as a member. Use when they type start week 20.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.0"
  week: "W20"
  course: "Ship"
  author: "CoEngineers"
---

# Week 20 lab: Make it stronger

Read `references/lab-rules.md` first and follow its eight steps. If the installed reference files cannot be opened, read the same files from the founder's approved app with `GitHub:get_file_contents`: `.claude/skills/start-week-20/references/lab-rules.md`, `save-rules.md` and `task-rules.md` in that same folder. Find the app from the founder's context or app map. Use this read-only fallback before asking the founder to locate files. If neither copy can be read, name the missing rules and stop before any write. This page gives the week's details. The work is done by the `product-hardener` skill. About 30 minutes.

## Before you start

Find the founder's second brain (`GitHub:search_repositories`, query `user:@me second-brain`). Read `product/app-map.md`, the launch record, the Week 18 test results and `product/PRD.md`. If the app is not online, send them to the Week 19 lab first.

A working free test address counts as online for practice checks. A bought web address, a launch record, an opening date and a payment page are not needed for those checks. Use the address and update method in the app map. Keep real sign-up, email delivery and member checks marked untried wherever they have not happened; never turn a practice check into a real member result.

**Bring:** the Week 18 test results, and anything members have said since the app went online.

## Check-in

Read the latest saved What happened outcome, not just the task title or its Done status. A finished task named "Fix" can mean the founder accepted a problem or it was not reproduced. Say a fix was made only when the outcome reports an actual change and its repeat check. Keep simulated repeats labelled simulated.

Read the Week 19 task "Open your live address on your phone and set your open date". A date for the doors makes the top fix urgent.

From the Week 19 What happened section: whether the live address opened on their phone, and the date they set to open the doors.

## Decisions (two rounds at most)

1. **The weak spots.** After the hardener's ranked draft (limits on sign-in attempts, who can see what, where members' details and secret codes are kept, payment and access staying in step): the founder confirms the order by harm to members, not effort.
2. **What you fix, date or accept.** The top one is fixed now. For each other, a date or an accepted risk with a reason. Draft from the ranking.

## Artifact

Build in Claude Code, the building tool (say it like that the first time, then just Claude Code). Tell the founder: open https://claude.ai/code, choose your app, and add your second brain with the + button. Before the handover, look at the app for changes still waiting for their yes (`GitHub:list_pull_requests` on the app the app map names). If last week's is waiting, say so and ask them to approve it first or agree to build on top of it. Start the pasted handover with "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it." Then give them the skill sentence, with the text below it that the lab hands over: a line starting "Change only:" that names exactly what was agreed (name the tests that check those words too, if the words change); "Leave everything else as it is. Do not change my second brain. Set no reminders."; and "When you finish, end with these five lines for me to copy back: Built: / Left: / Checks: / Still waiting for my yes: / New weak spots noticed: (each one, or none)." Claude Code works from the copy of the skills kept in the app, which can be older than these rules, so the pasted text must carry all of this every time. If what they paste back has no such five lines, say so and ask them to ask Claude Code for them Their job is to decide what it does and whether it is right. Say how they will see it: nothing is online until they press the green button on the app's change; only if the app map confirms updates are automatic, the test address updates after that. Otherwise say "ask whoever set up your online home to update it". When Claude Code has opened the change, they paste its hand-back block here and say "built"; the phone check is their step after the lab. If the block says the app already does this, say so, and use the lab to check it against the done test instead of calling it built. Read the block: say which change to approve, add any new weak spot to the notes and ask whether it becomes a task. This lab saves the notes; Claude Code opens no change to the second brain, and if it did, say so and ask them to close that one.

The sentence: "Use the product-hardener skill on my app." Hand over the ranked weak spots below it.

What they get is the Weak-spots page: ranked by harm to members, the top one fixed and rechecked as a member would, the rest dated or accepted. If the recheck cannot be done yet, the page says "Fix made, not rechecked" and what the recheck is waiting for, never Fixed.

## Criteria

- Ranked by harm to members, not effort.
- The top one fixed and rechecked.
- The rest dated or accepted.

## Records

Before any GitHub write, read `references/save-rules.md` and follow its five steps. Prepare and read back the notes on a new branch, then give the named comparison link with the verified branch, title and body. The founder puts the change forward there and saves it with the two green buttons. Never call `GitHub:create_pull_request`, refer to a form or Submit, or describe an already opened change as still needing to be put forward. The notes are prepared until the founder approves and the saved notes are read back. Read the saved notes before making tasks, and never repeat successful task writes on a retry.

Before writing either note, compare every result with the saved Do outcome and Claude Code's hand-back. Keep the source of each check: a separate practice copy, a hosted setting looked at, or a real member test. A setting seen is not a member test; a practice pass is not a pass on the hosted address. If the source or result was not given, write Unknown. Carry accepted problems and no-change outcomes into the summary unchanged, and never call them Fixed. Read both prepared notes back against these facts before offering the green button.

- `product/YYYY-MM-DD-weak-spots.md`
- `weekly/YYYY-MM-DD-week-20-stronger.md`

## Tasks

- "Fix <weak spot>": product, one per fix they own, due before your next lab.

## Close

Keep the same check sources and outcomes in your close as in the saved notes. Never say a practice check happened on the hosted address, or an accepted problem was fixed.

When you have done it, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
