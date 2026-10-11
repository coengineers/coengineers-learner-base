---
name: app-make-it-yours
description: Puts the founder's brand and their members' words into their app on its test address, in Claude Code on the web. Use in the Week 14 lab or when they want the app to look like theirs.
license: Proprietary. CoEngineers apprenticeship use only.
metadata:
  version: "2.0.2"
  week: "W14"
  course: "Ship"
  author: "CoEngineers"
---

## Start from the approved app

In Claude Code, before reading inputs or changing the app, fetch the app's default branch from its own origin. A new session can hold an older checkout, even after the founder approved a change. Read this skill and its references from that fetched branch again, and follow the current instructions. Check the saved app against the fetched default branch, never trust the session's starting checkout or an earlier skill load. Start new work from the fetched default branch unless the founder explicitly agreed to build on a named change still waiting. Preserve any work in progress; never reset it or overwrite it. If it cannot be kept safely, ask before changing it. Do this on a rerun too. It needs no new account permission.

# App: make it yours

Applies the founder's colours, type, wordmark and their members' words to their app, and shows it on its test address. In a lab, it hands the records back for the lab to save. On its own, save with `references/save-rules.md`.

Read the founder's `skills/app-make-it-yours.md` in their second brain if it exists: it holds their changes. It can change wording, order and emphasis, never the truth rules.

## Where it runs

Claude Code on the web (claude.ai/code), on the founder's app. Read the second brain through the link to GitHub if the workspace has it; otherwise use what the founder pasted from the lab. Follow `references/on-screen.md`: say "a change", "the test address", never branches, files or code unless they ask. No version numbers.

The session should hold two things: the founder's app and their second brain. Read the brand, logo files, plan and records from the second brain. If it is not in the session, ask the founder to add it (the + beside the app's name at the top of Claude Code) and wait; never ask them to paste the brand guide.

Before handing over, read the checks on the change (the green tick or red cross GitHub shows). If any is red, fix it first, including the app's own browser tests when your change altered words or pages they look for. Never hand over with red checks; if one cannot be fixed, say which and why in one line.

**In a lab, five rules:**
- **Look first for app changes still waiting.** Before building, list the app's changes that are not yet approved. If one is waiting (last week's, usually), say so by name and ask: approve it first, or build on top of it. Never build from the saved app in silence, and never describe a waiting change as the app having drifted.
- **Only what the handover names.** The lab's text says "Change only: ...". Change that and nothing else. Anything else you notice (a name, a label, another page) is reported, not changed.
- **Never change the second brain.** Open no change there and write nothing to it. The lab saves the notes.
- **Say how they will see it.** Nothing is online until they approve the app's change. Say so, and which it is: only if the app map confirms updates are automatic, the test address updates after the green button; otherwise say "ask whoever set up your online home to update it"; or, with no test address yet, they see it in the pictures you show and the phone check waits.
- **Your last message is the hand-back block,** every time, even if the founder did not ask. Say "Copy this into your lab chat:" and then exactly these five lines, filled in, in plain words (say "change" and "the green button", never pull request or merge):
  "Built: <what changed, or 'nothing: the app already does this'>.
  Left: <what was not done, or 'nothing'>.
  Checks: <each check and what was seen>.
  Still waiting for your yes: <each app change not yet approved, by name>.
  New weak spots noticed: <each one, or 'none'>."
  Schedule nothing and set no reminder of your own.

## Inputs

- `brand/DESIGN.md` with the Week 4 colours and type, and the saved logo it names (normally `brand/logo.svg`). Verify all three can be read. If a logo is missing, tell the lab to offer its quick approved wordmark route and save it first. On a standalone run, offer a wordmark from their confirmed name, colours and type and ask for approval; never borrow a different business's logo.
- `offer/OFFER.md`, `customers/` conversations, `product/PRD.md`, `product/app-map.md`.
- The lab's chosen words: the Home heading, the line under it, the sign-in words.

## What you make

1. **The app on its test address**, in the founder's colours, type and wordmark, with their words on Home and on the sign-in page. Anything that is the template's (its name, picture, footer) is replaced or removed. Read `references/method.md` for where each thing lives and how the brand tokens map.
2. **`product/app-map.md`**, updated: the look now used, the new words, and a dated line under What changed.

## Steps

1. Read the inputs and say in one line what you found.
2. Open the app's current look and list what is the template's.
3. Apply the brand in one change: colours, type, wordmark, footer, and the words the lab chose. Change every member-facing template phrase through `apps/web/src/brand.ts`: the sign-in words (the left panel shows on desktop only; phones show one panel), Home heading and line, eyebrow, panel, cards, banner, both footers, workspace labels, Guide and the page title. Draft short member words from the agreed offer for any phrases the lab did not name and ask for their yes in one round. Neutral account controls and error messages stay as they are. Never hard-code business words in a page component. Leave app behaviour as it is. Use tokens by name; never hard-code a colour or font the brand does not give. Keep the app's success and error colours. The logo is a file in the app's brand folder, set through `logoUrl` as `references/method.md` says; the on-screen rule about pasting a logo as code is for self-contained pages, not the app.
4. Check body text and buttons are easy to read (contrast) and run the app's own checks. Show Home and sign-in at phone size and laptop size. The sign-in form must visibly show the app name and logo at both sizes, including account creation and recovery; the wide story panel alone is insufficient.
5. Open the app's change for the founder's yes. They read it and press the green button when it is right. Only promise an automatic update if the app map confirms it. Otherwise say "ask whoever set up your online home to update it".
6. The phone check is the founder's step after the lab: once the change is approved, they open the test address on their phone and note three things. Do not ask for the notes now.
7. Write the map update's text for the lab to save.

## Truth rules

- The test address only. Nothing goes to a real address or a real member.
- Every word on Home comes from the lab's choice or the offer. Nothing invented about the business.
- Pictures are the founder's own or none. Generated pictures are labelled "Illustrative".
- No password or key in the chat or the map.

## Checks before you hand back

- The colours, wordmark and every member-facing template phrase are the founder's. Read each page and its title to check. Never hand back template words as Left; finish this part of the agreed look and words before handing back.
- Home says what the member gets, in their words.
- You said how and when they will see it on their phone.
- The app's checks passed, or say "Not run" with the reason.

Hand the lab, as the one block to paste: the test address, what changed, the map update's text, and any new weak spot.
