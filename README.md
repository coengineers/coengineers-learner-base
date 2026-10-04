# Your app starts here

This is the CoEngineers base app: a small, working app with sign-in, a home page, an account page and private files. In the Ship course you take a copy that is yours, and Claude Code builds your business on it, one week at a time.

You do not need to read or write code. You need a GitHub account (you made one in Module 0) and about ten minutes.

## 1. Take your copy

Your copy must be **private**, so only you can see your app's code.

1. Sign in to GitHub and open this page: https://github.com/coengineers/coengineers-learner-base
2. Press the green **Use this template** button. If a small menu opens, choose **Create a new repository**.
3. **Owner:** choose yourself.
4. **Repository name:** your app's name in small letters with dashes, for example `your-business-app`.
5. **Choose visibility:** pick **Private**. Look twice: GitHub often sets this to Public when you choose the owner. Do not press Fork instead of Use this template: a fork of a public page is public.
6. Press **Create repository**. In a few seconds you are looking at your own copy.

That copy is yours. You choose who can see it or change it.

## 2. Let Claude Code see it

Claude Code is the building tool. It can only work on the copies you allow.

1. Open https://claude.ai/code
2. Press **+** above the box where you type. Click in the search box first, then type your app's name.
3. If it is listed, choose it. Then press **+** again and choose your second brain the same way.
4. If it says "No repositories match", press **Refresh list** first and search again. If it is still missing, press **Install the Claude GitHub App** underneath. GitHub opens in a new tab and may ask you to confirm it is you. Choose your own name. Under **Repository access**, **Only select repositories**, press **Select repositories** and pick your app, then your second brain. Press **Save**. Go back to Claude Code and search again.

You only do this once.

## 3. Your app's accounts session

Your app needs two more free things before it can go online: a place to keep your members' details (Supabase) and a place for the app to live online (Cloudflare). You set these up in the live session called Your app's accounts, with John on the call and Claude doing the joining up.

Before the session: do steps 1 and 2 above. In the session you type `/start-app-setup` in Claude and follow it. At the end your app opens at its own free test address and you can sign in to it.

Free plans only. You never need a card. If a page asks for one, stop and tell John.

## Each week after that

Each lab in Claude gives you a sentence to paste into Claude Code. Claude Code makes the change and shows it to you. Nothing changes in your app until you press the green button on that change. Your app map says whether approved changes reach your test address automatically. If updates are automatic, the test address will update after your yes. Otherwise, ask whoever set up your online home to update it.

Under every change you will see **checks**: your app testing itself. They take about six minutes. Green means your app still works. Red means tell Claude Code "the checks are red" and it will look.

## Keeping the skills up to date

Your copy carries the instructions Claude Code follows for each week (they live in a folder called `.claude/skills`). When CoEngineers improves them, paste this into Claude Code with your app chosen:

> Bring my app's skills up to date from the CoEngineers base app, as a change for me to approve.

Claude Code: run `git fetch https://github.com/coengineers/coengineers-learner-base.git main && git restore --source=FETCH_HEAD --staged --worktree -- .claude/skills .claude/ship-skills-manifest.json`, then open the change. Touch nothing else.

## Stuck?

Take a screenshot to the weekly drop-in, or email john@coengineers.ai.

## For developers

How the app is built, how to run it on your own computer and how it is checked: [docs/DEVELOPING.md](docs/DEVELOPING.md) and the [documentation map](docs/README.md).
