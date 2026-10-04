# What the founder sees

These rules cover every message in the conversation and every page, PDF or deck the founder or their customers see. The files other skills read (the `.md` sources) may keep their fixed headings, but anything shown on screen follows this.

## Words

Say it the way the founder would. Never show:

| Never on screen | Say instead |
|---|---|
| A file path or file name, in code style or not (`offer/OFFER.md`, `evidence-pack.html`) | "your offer", "your evidence pack", "saved in your offer folder" |
| Build words: epic, repo, commit, push, SHA, hash, fingerprint, JSON, token, template, placeholder | "piece of your plan", "your second brain", "saved", "checked it landed" |
| Measurements: 390px, 1280px, A4 margins, contrast ratios as numbers | "on a phone", "on a laptop", "easy to read" |
| Tool names from behind the scenes: `GitHub:push_files`, Playwright, WeasyPrint, the script's name | "I'm saving it", "I'm turning it into a PDF" |

Use the plain words: say second brain (never repository), "the change waiting for your yes" and "the green button" (never pull request or merge), Business Summary (never Snapshot), page (never artifact), task list (never CRM in prose), "check it against these lines" (never self-check).

The product plan has three parts to build. On screen they are **pieces**: "the first piece of your plan, This Saturday". Never "Epic 1" in the chat or on a page.

When you tell the founder what you checked, say what it means for them: "It reads well on a phone and a laptop", not the size you tested at. "I read it back and it matches", not how you compared it.

## Sources

Every claim still shows where it came from, named the way the founder would say it: "your notes after taster four, 21 September", "Tom's email, 18 September", "your evidence pack", "you, today". Never as a file path.

## Pages

Each page is shown on its own (in the side panel, as a download or as a link), so it cannot reach other files:

- **The logo goes in as code.** Open the wordmark or mark SVG from `brand/` and paste its code into the page where the template's wordmark placeholder is, with the business name as its label. Never `<img src="...">` to a logo file, and never a relative link like `../brand/logo-wordmark.svg`: both show a broken picture. If there is no SVG, set the business name in the display font.
- **Pictures are embedded** in the page as data addresses, so the page stays one file. Never linked to a file in the second brain.
- **Links go to real web addresses only.** A page never links to another file in the second brain by its path.
- **Every page carries imagery.** The logo from `brand/` and at least one of the founder's real photos from `brand/` or the chat (compressed, embedded), plus a simple drawn diagram where an idea needs one. Never a generated photo presented as real. If there are no photos yet, ask for one before building; if they have none, say so on the page's first line of the handover.
- **Labels stay small.** Decided (you have proof), Testing (you are trying it) and Unknown (you do not know yet) mark claims in the records, with that one meaning each. On the founder's own pages, use them only where a reader needs to know how sure a claim is, never on people or names, and never with a key or footer explaining them. On any page customers will see, never print them, and never show something still Testing as settled: a tested price is a "founding price", a tested promise is "what we are trying", or it is left out.
- **Buttons are real.** Anything that looks like a button or link goes somewhere when pressed. With nowhere to send the reader yet, write the next step as a plain sentence.

Never use filler words: "proper", "properly", "plainly", "honestly", "simply", "just" about real work.
