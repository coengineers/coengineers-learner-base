---
name: start-week-14
description: Runs the CoEngineers Week 14 lab. The founder sees their own app, in their brand and their words, on their phone, and sets one task. Use when they type start week 14.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.4"
  week: "W14"
  course: "Ship"
  author: "CoEngineers"
---

# Week 14 lab: Make it yours

Read `references/lab-rules.md` first and follow its eight steps. This page gives the week's details. The build is done by the `app-make-it-yours` skill. About 30 minutes.

## Before you start

Find the founder's second brain (as the lab rules say). Read `brand/DESIGN.md` and the wordmark beside it, `offer/OFFER.md`, `customers/` conversations, `product/PRD.md` and `product/app-map.md` (the test web address and where the app lives on GitHub). If there is no app map, send them to the setup session first. Check that the Week 4 guide actually names the colours and type and that the logo it names can be opened. Say which were found. If the guide or its choices are missing, offer to finish Week 4 or choose a quick set together within the shared design rules. If only the logo is missing, offer a quick wordmark from their business name, confirmed colours and type; show it, get their yes and save `brand/logo.svg` with its location in `brand/DESIGN.md` through this lab's save. Read it back before saying it is ready. Never send them away merely because Week 4 failed to save the logo.

**Bring:** (the first reply opens "To have to hand:" with this) their phone, their app's test address, and their customers' three favourite words from Week 5.

## Check-in

Read the Week 13 task "Show the plan to <name>". What they said may shape the words on Home.

From the Week 13 What happened section: what the person said they would miss.

## Decisions (two rounds at most)

1. **The words.** Three drafts of the Home heading and one line under it, in their members' words. They pick or write their own. Confirm the sign-in page words in one line.
2. **The look.** Show their colours, type and wordmark from the brand kit and ask what, if anything, should differ in the app. Nothing by default.

## Artifact

Build in Claude Code, the building tool (say it like that the first time, then just Claude Code). Tell the founder: open https://claude.ai/code, choose your app and your second brain from the Repo button at the bottom. Before the handover, look at the app for changes still waiting for their yes (`GitHub:list_pull_requests` on the app the app map names). If last week's is waiting, say so and ask them to approve it first or agree to build on top of it. Start the pasted handover with "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it." Then give them the skill sentence, with the text below it that the lab hands over: a line starting "Change only:" that names exactly what was agreed (name the tests that check those words too, if the words change); "Leave everything else as it is. Do not change my second brain. Set no reminders."; and "When you finish, end with these five lines for me to copy back: Built: / Left: / Checks: / Still waiting for my yes: / New weak spots noticed: (each one, or none)." Claude Code works from the copy of the skills kept in the app, which can be older than these rules, so the pasted text must carry all of this every time. If what they paste back has no such five lines, say so and ask them to ask Claude Code for them. Their job is to decide what it does and whether it is right. Say how they will see it: nothing is online until they press the green button on the app's change; only if the app map confirms updates are automatic, the test address updates after that. Otherwise say "ask whoever set up your online home to update it". When Claude Code has opened the change, they paste its hand-back block here and say "built"; the phone check is their step after the lab. If the block says the app already does this, say so, and use the lab to check it against the done test instead of calling it built. Read the block: say which change to approve, add any new weak spot to the notes and ask whether it becomes a task. This lab saves the notes; Claude Code opens no change to the second brain, and if it did, say so and ask them to close that one.

The sentence: "Use the app-make-it-yours skill on my app." Hand over their chosen words and the verified logo location below it, and tell Code to copy `brand/logo.svg` to `apps/web/public/brand/logo.svg` and set `logoUrl` "/brand/logo.svg" and `logoIncludesName` true in `apps/web/src/brand.ts`, never pasting SVG code inline. If a new logo is still waiting for approval, finish that save before asking Code to read it. Include replacing every member-facing template phrase in the look and words: the sign-in words (the left panel shows on desktop only; phones show one panel), Home, cards, banners, footers, workspace labels, Guide and title, through the app's brand settings. Other words are short drafts from the offer, shown in Claude Code's chat as a list and confirmed there before they are kept; no template phrase is left for a member to see.

What they get is their app on its test web address (not yet online for the public), in their colours and wordmark, with their words on Home. Opening it on their phone and noting three things is the Do, after the change is approved.

## Criteria

- Your colours and wordmark, not the template's.
- The home page says what the member gets in your words.
- It opens on your phone. If it shows a sign-in page, sign up with your own email.

The third line can only be rated once the app's change is approved and the test address has updated. Until then it is "not yet", and the Do settles it.

## Records

- `product/app-map.md`, updated with a dated "What changed"
- `brand/logo.svg` and `brand/DESIGN.md` only if the missing-brand recovery above was used; show and confirm each guide edit first.
- `weekly/YYYY-MM-DD-week-14-make-it-yours.md`

## Tasks

- "Open the app on your phone and note three things": product, due before your next lab. Claude saves their three notes when they type /did-it.

## Close

When you have done it, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
