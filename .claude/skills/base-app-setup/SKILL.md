---
name: base-app-setup
description: Sets up the founder's own copy of the base app, its database and online home, and joins them up, then maps it. Use in Your app's accounts session or when they want their app's accounts set up.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.0"
  week: "Setup"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# Base app setup

Wires the founder's own app: a private copy of the base app in their GitHub, its database, the place it lives online and the links between them, all in accounts they own. Then it hands the app map back to the accounts lab. The second brain holds the only map, at `product/app-map.md`; never keep a copy in the app. The lab saves with `references/save-rules.md`.

Read the founder's `skills/base-app-setup.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Where it runs

Claude Code on the web (claude.ai/code), with the founder's app selected once it exists. Read the second brain through the link to GitHub if the workspace has it; otherwise use what the founder pasted from the lab. Follow `references/on-screen.md` for everything the founder sees. Never show version numbers, file lists or code.

The session should hold two things: the founder's app and their second brain. Read the brand, logo files, plan and records from the second brain. If it is not in the session, ask the founder to add it (the + beside the app's name at the top of Claude Code) and wait; never ask them to paste the brand guide.

## Inputs

- `business/one-line.md`, `brand/DESIGN.md`, `offer/OFFER.md`, `product/PRD.md` if there is one, and an earlier `product/app-map.md` (a rerun: change only what changed).
- The app's name and region, from the sentence the founder pasted. Ask only for what it leaves out.
- The founder's copy of the base app, already chosen in this session. They made it before the session with Use this template on https://github.com/coengineers/coengineers-learner-base, set to Private.
- Accounts made by CoEngineers in the founder's name: GitHub, the database and the place the app lives online. See `references/method.md` for the parts and account steps.

## Steps

1. Say in three lines what they will have, that the account steps are theirs alone, and that free plans need no card.
2. **Take the accounts over.** For each account, one at a time: the founder signs in and confirms their name shows as owner. Wait for "done" each time. Replacing the temporary password and turning on two-step sign-in are theirs to do after the session, by the three routes on the Do page; say so once and do not walk them through it here. Passwords and keys go only into the provider's own page or Code's secret settings, never the chat. An account missing or in someone else's name: stop that step and tell John.
3. **Check the copy.** It is in the founder's own GitHub, named after the app, private, and starts from one commit. If this session is not on their copy, stop and give the steps: on the base app's page press Use this template, then Create a new repository, owner themselves, Private (never Fork: a fork of a public page is public), then choose it here with +. If the copy is public, they make it private in its Settings before you go on. Then check nothing from CoEngineers came with it.
4. **Database.** Create the project in the agreed region, set it up with the app's own set-up, switch on email sign-in with confirmation, and set the return addresses to the test address. Check a confirmation email reaches the founder's own inbox.
5. **Online home.** Connect the copy to where it will live online, give the build settings from `references/method.md`, and have the founder type the three settings into the online home's own settings. Check whether an approved change reaches the free test address automatically. Record Automatic only when seen; otherwise record Manual and say "ask whoever set up your online home to update it".
6. **Links between the parts.** Read back that the online home reaches the database and that the app's doorway for Claude answers.
7. **Read it back with the founder.** They open the test address, sign up, confirm, add their name, upload and remove a practice file, sign out and in. They say what they saw.
8. **The app map.** Hand its text back in the chat for the accounts lab to save to `product/app-map.md` in the second brain. Never write `docs/app-map.md` or another map in the app. If a stale copy is already in the app, remove it in the same change as any account settings that need changing. Open at most one change on the app, only if its settings or the stale copy need changing; otherwise open none. Open no change on the second brain and write nothing there. Do not build the page in Claude Code: it is made back in the lab. End with one line. If every step was done: "Go back to your accounts chat with this map and say joined up." If any step is still open: "Go back to your accounts chat with this map and say: these are still to do: <the steps, by name>." Never tell them to say joined up while a step is open.

## The app map

Hand back the text for `product/app-map.md`, and the page: one screen in the founder's brand (`references/house-style.md` if they have no `DESIGN.md`), readable on a phone, no downloads. Sections: at a glance (test address, where the app's copy lives, database and region, online home, cost today, updates: Automatic only if seen, otherwise Manual or Not checked yet); who owns what; the pages that exist today; where members' details live and who can see them; where each key is kept (never the key); what it costs and when they would pay; what was checked and what was seen; what comes next from the plan, marked Planned; how to get help.

## Truth rules

1. Nothing from CoEngineers travels: no settings, data, test records or history. The copy's single starting commit is expected; any other earlier history is not. CoEngineers names and branding in the code stay until Week 14 (Make it yours).
2. No password or key in the chat, the map or the code. If one is pasted, tell the founder to replace it at the provider and carry on with the new one.
3. A check is Passed only when it was seen to pass. Otherwise "Not checked yet" with the reason. The test address is "Not live yet" until it loads.
4. Free plans only. Never enter card details or switch on a paid plan. If a page asks for a card, stop and tell John.
5. You cannot contact anyone. Never say you have asked, told or checked with John or anyone else; say "tell John" and what to tell him. Say a thing was read back only if the founder can see the same result.
6. Only what exists. Every page in the map exists today; unknowns read "To be decided".

## Limits

At most two rounds of questions, each with a draft answer. Two hours in all, including the founder's account steps. A step that fails after two fixes stops: record it in the map with the one step left and who does it, then carry on.

## Checks before you hand back

- The copy is private, in the founder's name, and free of CoEngineers material.
- Every account shows the founder as owner.
- The map matches what was seen, and holds no key.
- British English, no em dashes, no file paths on screen.

Hand the lab: the map's text for `product/app-map.md`, the page's content, and the one line on what is still open.
