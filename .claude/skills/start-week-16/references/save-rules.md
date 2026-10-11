# Save rules (read at the save step)

The second brain is saved through the `GitHub` connector, always as one change on its own branch (say "a change waiting for your yes" to the founder) that the founder approves with the green button.

## Names (every record named for what it is and dated, in the folder it belongs to)

- Dated records: `<folder>/YYYY-MM-DD-<what-it-is>.md`, for example `customers/2026-11-19-customer-conversations.md`.
- Living records keep a fixed name and gain a dated "What changed" line: `business/DECISIONS.md`, `offer/OFFER.md`, `brand/DESIGN.md`, `product/PRD.md`, `product/app-map.md`, `growth/content/CONTENT-SYSTEM.md`.
- The week's one-page summary: `weekly/YYYY-MM-DD-week-NN-<short-title>.md` (week 0 is `week-00`). It holds: what was made (the artifact's name, and its link if the founder shares one), the decisions, the self-check ratings and Claude's one improvement, the week's commitments in one line that is true when written ("To be set as dated tasks once you approve this change:" plus the agreed titles and dates; in `/did-it` and the weekly check-in, where the tasks already exist, "On your task list:" plus titles and dates), and links to the week's records.
- Folders: business, customers, product, offer, growth, brand, sources, weekly, skills. No other top-level folders. No README files as records.

## The five steps

1. Choose the paths from the lab's `## Records` plus the weekly summary.
2. `GitHub:create_branch` named `week-NN-<short-title>-YYYY-MM-DD` from the default branch. If a branch or an open change with that name is already there, make a new branch with `-2` (then `-3`) on the end: never add to a change that was opened earlier.
3. `GitHub:create_or_update_file` for each record on that branch (fetch the current file's sha first when updating a living record). Text files only: the approved logo may be a self-contained text SVG saved as `brand/logo.svg`; never a PDF, raster image, zip or any other binary file. Read a new or changed logo back as well as the weekly summary.
4. Read the weekly summary back once from the branch (`GitHub:get_file_contents`) and compare it with what was agreed. Prepare a plain title ("Week 5: talk to your customers") and a two-line body: what it adds, and "Read it. If it is right, press the green button." No footer, attribution, co-author or session link.
5. Give a named GitHub compare link, "Open your change": `https://github.com/<owner>/<repo>/compare/<default-branch>...<new-branch>?expand=1&title=<encoded-title>&body=<encoded-body>`. Use the second brain, default branch and new branch verified above; encode the title and body for the address. Say: "I have put your change together and checked it reads right. Open your change. The first green button puts it forward. Then read it and press the green button to save it. Confirm if GitHub asks. Come back and say 'done'." Use the named link for "Open your change", never a bare address.

Never call `GitHub:create_pull_request` for a second brain save: its confirmation form may not appear in the chat. The founder puts the change forward in GitHub through the named link, then approves it there. Never refer to a form or a Submit button. The notes on the new branch are only prepared, not saved. Never claim a change has been opened or saved because a tool says a form was created. On "done", read the note from the default branch before claiming it is saved or writing the lab's tasks.

A change holds only what the founder said or confirmed in this chat and what was already saved. Before changing a living record, list every line you will change, before and after, and wait for their yes; change nothing else in it. New material the founder brings goes to `sources/`, one note each, with the date it was written (ask if it is not on it). Its title never uses filler words. In every note in the change, not only the weekly summary, a line about tasks is true when written: before the tasks exist it says "to be set once you approve this change", never "held", "set" or "saved". No note says a link or anything else is "to follow": write "not published yet", and if an older note being updated says "to follow", change that line too.

Never write to the default branch. Never press the green button yourself. If a write fails twice, say so, give the founder the records in the chat, and never say it was saved.
