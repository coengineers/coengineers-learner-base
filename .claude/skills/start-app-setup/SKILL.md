---
name: start-app-setup
description: Runs the CoEngineers session called Your app's accounts. The founder owns their app's accounts, and Claude joins them up in a live session with John. Use when they type start app setup.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.1"
  week: "Setup"
  course: "Ship"
  author: "CoEngineers"
---

# Your app's accounts

Read `references/lab-rules.md` first and follow its eight steps. This page gives the session's details. The joining up is done by the `base-app-setup` skill. About 30 minutes to join up accounts prepared in Week 12 Do. The learner creates and owns their GitHub, Supabase and Cloudflare accounts before Week 13. This session helps connect them to the app; the live session or supported drop-in is available when a step is unclear. No temporary staff-created accounts are assumed.

## Before you start

Find the founder's second brain (`GitHub:search_repositories`, query `user:@me second-brain`). Read `business/one-line.md`, `brand/DESIGN.md`, `offer/OFFER.md` and `product/PRD.md`. The founder takes their own copy of the base app before the session: on https://github.com/coengineers/coengineers-learner-base they press Use this template, then Create a new repository, choose themselves as owner, name it after their app and choose Private. Look for it (`GitHub:search_repositories`, query `user:@me` and the app's name). If there is no copy yet, give those steps first and wait for "done"; never tell them to press Fork, because a fork of a public page is public. If the copy is public, say so and have them make it private in its Settings before anything else. Supabase and Cloudflare are the learner's own accounts prepared in Week 12 Do, secured by them on each provider's site. If either is missing, return to that preparation guide and mark it not yet. If the offer is missing, send them to the Week 12 lab first.

Ask whether they want guided help now or in the live session. They can check their own accounts and prepare their private copy before the session. Pause a step that needs owner action or support, but continue independent preparation.

**Bring:** their GitHub sign-in from Module 0, and their phone. The email their accounts are in is typed on each site, never into this chat: do not ask for it.

## Check-in

Read the Week 12 decision note and the open Week 12 tasks. Your first reply names the call they made in Week 12 and its first-step task by title, and says whether it is done. Never check in on an older task instead. Note anything that changes what the app must do first.

## Decisions (two rounds at most)

1. **The app's name and where members' details are kept.** Draft the name from their business name and the country from where their customers are. The country is chosen once.
2. **Who is on the accounts.** The founder created and owns each account with their own email. Never ask for that email or any other. Ask only whether anyone else needs to be added later (nobody by default).

## Artifact

Build in Claude Code, the building tool (say it like that the first time). When they are ready to join up their own accounts, tell the founder: open https://claude.ai/code, press + and choose your app (the copy you made), then press + again and add your second brain. If Claude Code says "No repositories match", press Refresh list first and search again. Only if it is still missing, press Install the Claude GitHub App under it, choose Only select repositories, pick your app and your second brain, save, then go back and search again. Give them one sentence to paste, filled in with the decisions: "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it. Use the base-app-setup skill to set up my app, <app name>, in <region>. My second brain is <second brain name>."

Which steps happen where, to say to the founder:

- **Week 12 Do, before Week 13:** the learner creates Supabase and Cloudflare accounts, verifies email, secures sign-in and confirms they can return to both dashboards. GitHub was set up in Module 0. The course guide gives the steps and expected results; passwords and recovery codes remain private.
- **Joining up, with help available:** use the learner-owned accounts to set up the place that keeps members' details, put the app at its free test address and connect the parts, one step at a time. Confirm their name or organisation owns each. If a page asks for a card, stop that step and bring it to support.
- **Any unfinished step:** record what is still needed and who does it. The learner signs in or changes account security only on the provider's own pages. Never request passwords or recovery codes here or claim a support session is booked.


When the joining up is done they say "joined up" here. If they say some steps are still to do, name those steps, never show or call the joining up done, and put each open step in the notes with whose step it is. If Claude Code opened an app change, read it and press the green button to approve it. That saves the app change. If no settings needed changing, there may be no app change; Claude Code opens none on the second brain, and if it did, say so and ask them to close that one.

Then ask the founder to paste Claude Code's map text here. Use that and the saved `product/app-map.md` in the second brain to make the app map page. The second brain holds the only map; never look for a map in the app: what lives where, who owns it, what it costs, and what comes next, in the founder's brand, readable on a phone. Anything you cannot see is marked Unknown.

## Criteria

Check each line from what was actually seen or reported. Say when a check needs help or has not happened.

- Every account is in your own name.
- Your app opens at its test address and you can sign in to it.
- The app map says where each thing lives and who owns it, with no secret codes in it.
- You can say which parts are in this chat and which are on other sites.

## Records

- `product/app-map.md`
- `weekly/YYYY-MM-DD-week-13-app-setup.md` (with the page's link)

## Tasks

- Only unfinished setup or account-safety steps, as admin tasks agreed with the learner, due before their app work begins. Do not create another preparation task if Week 12 already records it complete.

## Close

Your app map is waiting for your yes: open it and press the green button. When the agreed setup steps are done, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
