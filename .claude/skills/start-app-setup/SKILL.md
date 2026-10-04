---
name: start-app-setup
description: Runs the CoEngineers session called Your app's accounts. The founder owns their app's accounts, and Claude joins them up in a live session with John. Use when they type start app setup.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.0"
  week: "Setup"
  course: "Ship"
  author: "CoEngineers"
---

# Your app's accounts

Read `references/lab-rules.md` first and follow its eight steps. This page gives the session's details. The joining up is done by the `base-app-setup` skill. This lab runs inside the live session with John and takes about 30 minutes of it. Say at the start that this lab is about 30 minutes inside the session, and which parts happen where: "John and I do the joining up together in this session. Afterwards, on your own, you make each account safe: your own password and a code from your phone. That takes 45 to 60 minutes, before your next lab."

## Before you start

Find the founder's second brain (`GitHub:search_repositories`, query `user:@me second-brain`). Read `business/one-line.md`, `brand/DESIGN.md`, `offer/OFFER.md` and `product/PRD.md`. The founder takes their own copy of the base app before the session: on https://github.com/coengineers/coengineers-learner-base they press Use this template, then Create a new repository, choose themselves as owner, name it after their app and choose Private. Look for it (`GitHub:search_repositories`, query `user:@me` and the app's name). If there is no copy yet, give those steps first and wait for "done"; never tell them to press Fork, because a fork of a public page is public. If the copy is public, say so and have them make it private in its Settings before anything else. CoEngineers has already made the other two accounts in the founder's name (a place to keep members' details, and a place to put the app online). The founder owns every one. If the offer is missing, send them to the Week 12 lab first.

Ask first: "Are you in the live session with John now?" If not, do the check-in and the decisions only, do not give the sentence to paste, and say the rest happens in the session. Never tell them to sign in to the three sites before the session: the order is the session first, then making the accounts safe.

**Bring:** their GitHub sign-in from Module 0, and their phone. The email their accounts are in is typed on each site, never into this chat: do not ask for it.

## Check-in

Read the Week 12 decision note and the open Week 12 tasks. Your first reply names the call they made in Week 12 and its first-step task by title, and says whether it is done. Never check in on an older task instead. Note anything that changes what the app must do first.

## Decisions (two rounds at most)

1. **The app's name and where members' details are kept.** Draft the name from their business name and the country from where their customers are. The country is chosen once.
2. **Who is on the accounts.** The founder owns each account, in the email the accounts were made with. Never ask for that email or any other. Ask only whether anyone else needs to be added later (nobody by default).

## Artifact

Build in Claude Code, the building tool (say it like that the first time). Only when they are in the session, tell the founder: open https://claude.ai/code, press + and choose your app (the copy you made), then press + again and add your second brain. If Claude Code says "No repositories match", press Refresh list first and search again. Only if it is still missing, press Install the Claude GitHub App under it, choose Only select repositories, pick your app and your second brain, save, then go back and search again. Give them one sentence to paste, filled in with the decisions: "First bring my app’s copy up to date with the changes I have approved. Read the current skill from that copy before using it. Use the base-app-setup skill to set up my app, <app name>, in <region>. My second brain is <second brain name>."

Which steps happen where, to say to the founder:

- **In the session, with John:** Claude sets up the place that keeps members' details, puts the app online at its test web address, and joins the parts up, one step at a time. John answers questions. No card is needed. If a page asks for a card, stop and tell John.
- **Afterwards, on their own (the Do):** on each site's own page, replace the temporary password with their own and turn on two-step sign-in with an authenticator app: scan the QR code and enter the code it gives. The Do page has the three routes: GitHub (Settings, then Password and authentication), Supabase (account settings), Cloudflare (My Profile, then Authentication). Verify Cloudflare's email first. Save the recovery codes GitHub and Cloudflare give, somewhere private. Supabase gives none: add a backup factor on a different device and app instead. Then sign in again to test it. Give these as the Do page gives them; never improvise a path or say every site gives recovery codes. No password or secret code goes into the chat.

When the joining up is done they say "joined up" here. If they say some steps are still to do, name those steps, never show or call the joining up done, and put each open step in the notes with whose step it is. If Claude Code opened an app change, read it and press the green button to approve it. That saves the app change. If no settings needed changing, there may be no app change; Claude Code opens none on the second brain, and if it did, say so and ask them to close that one.

Then ask the founder to paste Claude Code's map text here. Use that and the saved `product/app-map.md` in the second brain to make the app map page. The second brain holds the only map; never look for a map in the app: what lives where, who owns it, what it costs, and what comes next, in the founder's brand, readable on a phone. Anything you cannot see is marked Unknown.

## Criteria

Say that the first two are ticked with John at the end of the session, and the last two here.

- Every account is in your own name.
- Your app opens at its test address and you can sign in to it.
- The app map says where each thing lives and who owns it, with no secret codes in it.
- You can say which parts are in this chat and which are on other sites.

## Records

- `product/app-map.md`
- `weekly/YYYY-MM-DD-week-13-app-setup.md` (with the page's link)

## Tasks

- "Make your three accounts safe": admin, due before your next lab. The steps are the Do page's, as above. Done when they can sign in to all three with two-step sign-in and a backup.

## Close

Your app map is waiting for your yes: open it and press the green button. When your three accounts are safe, type /did-it.

## If they have nothing to hand

Offer the material in `references/scenario/` as practice, clearly labelled, without saving it.
