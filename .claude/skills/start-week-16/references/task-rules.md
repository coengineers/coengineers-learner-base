# CRM task rules (read at the tasks step and the check-in)

Every real-world step the founder commits to becomes one task in the CoEngineers CRM, through the `CoEngineers CRM` connector.

Course/lab improvement feedback is an email draft to ed@coengineers.ai for the learner to send, never a CRM task or comment. A learner saying "skip" creates no feedback. Business improvement tasks remain ordinary dated tasks.

## Writing a task (`create_task`)

- **title**: starts with a verb and names the person or thing. "Ask Sam Patel to try the prototype", not "Prototype test".
- **category**: one of sales, marketing, product, improvement, admin (the lab's `## Tasks` says which).
- **dueAt**: a Do task is due before the founder's next lab (17:00 the day before it, their time, as ISO 8601), except in Weeks 7, 9 and 15, where the lab names an earlier date. The next lab's date comes from the lab day in `business/my-week.md` in their second brain; if it is not there, ask which day they do their lab, never guess. Say the date, offer it, and let them choose an earlier one, never a later one. Never use other wording such as "within three days". Any date written in the body (Objective, Steps or Acceptance) must be the same date as `dueAt`; when a date changes, change it in the body too.
- **owner**: `me`.
- **contactId / dealId**: link the person. Before creating a contact, always look for the person by name (`list_contacts`) and use the one that is there. Only if there is none, create it (`create_contact`: fullName, lifecycle `new`, notes with one line on who they are and why they fit). A task links only one of contact, deal or offering. A money ask gets a deal (`create_deal`, linked to the contact) and the task links the deal, which carries the contact; every other task about a person links the contact. One task per person, always: a step that covers several people (two listeners, three shops) is one task for each, each linked to its own contact. Never one task for several people, and never names listed in a body instead.
- **aiMode**: `human`. **status**: `todo`.
- **body** (the CRM's own task format), in this order and plain words:
  - OBJECTIVE: what to do, in one line.
  - CONTEXT: why, tied to this week (one line).
  - STEPS: how many and how (one to three short lines).
  - ACCEPTANCE: what counts as done.
  - NEXT STEP: "When you have done it, type /did-it in Claude." (Claude writes the contact notes; the founder never types into the task list.)
  - SOURCE: "Week NN lab, <date>".

Read the tasks back once (`list_tasks`, filtered to this week) and always show them in one small table: task, who, date. Who is "You" for every task the founder does, even when it names another person (an ask, an invitation, a test they run); write "You, with <name>" when someone else takes part. Name a task by its title. Never show a task's reference number, in the chat or in a saved note.

## Reading tasks back (check-in)

In a lab, read at the check-in and write nothing until the founder says "done" after the green button: then make these writes with the week's tasks.

- `list_tasks` with `owner: me` for open work, and again with `includeDone: true` for anything completed since the last lab.
- Group them: done, overdue, due later.
- Done (it really happened): `complete_task` with `humanScore` set to the founder's own 1 to 10 score, and one `add_task_comment` with what happened in their words.
- Not done: ask why in one line; `update_task` with the new date they choose; `add_task_comment` with the reason. Never mark it done.
- What a person said goes on their contact: `update_contact` notes (append, keep under 4,000 characters) and move lifecycle forward (contacted, engaged, customer) only when it is true.

## Never

- Never send, post, publish or charge anything. Tasks are the founder's to do.
- Never create tasks for things the founder did not agree to.
- Never write task list data into the second brain beyond the weekly summary's list of task titles and dates, and the `## What happened` section that `/did-it` adds (their words, quotes and score; never phone numbers, emails or addresses).
