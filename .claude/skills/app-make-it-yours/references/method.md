# Method: applying the brand

Read this when you change the app's look.

## Where things live

The base app keeps its look in one brand settings file (`apps/web/src/brand.ts`): app name, wordmark, logo, colours, fonts, every member-facing template phrase and an illustration. Change the named word settings there, including Home, the sign-in words (the left panel shows on desktop only; phones show one panel), cards, banners, footers, workspace labels, Guide and the title. Page components must keep reading these settings, never replace them with hard-coded words. Read the pages list from `apps/web/src/App.tsx`.

## Token mapping

| Brand kit | App setting |
|---|---|
| page background, card, quiet panel | `canvas`, `surface`, `chrome` |
| text, secondary text | `text`, `muted` |
| the one accent, text on it | `accent`, `accentText` |
| accent hover and dark accent, if given | `accentHover`, `accentInk` (else the accent, and the focus colour) |
| separators, focus | `line`, `focus` |
| input border, if given | `inputBorder` (else a shade of the text colour with at least 3:1 against the page) |
| display, body and mono type | `displayFont`, `bodyFont`, `monoFont` |
| wordmark or logo | `name`, `wordmarkAccent`, `logoUrl` |

Also: `appLabel` is the app's name; `signInHeading` and `signInDescription` introduce the business on the left; `signInFormHeading` and `signInFormDescription` are the lab's sign-in words; `homeHeading` and `homeDescription` are its Home words; `footer` is the business name or the brand's line. Keep the template's picture only with the CoEngineers house style; otherwise the founder's own image from `brand/`, or none. Fonts are kept inside the app with their licence; if the licence does not allow it, use the nearest open font and say so.

## The logo

The app supports one logo route only: a file served from the app's own folder. Copy `brand/logo.svg` from the second brain to `apps/web/public/brand/logo.svg`, then in `apps/web/src/brand.ts` set `logoUrl` to "/brand/logo.svg" and `logoIncludesName` to true when the logo already contains the business name. Never paste SVG code inline into a page. With no SVG, leave `logoUrl` empty and set the business name in the display font. The left sign-in panel shows on desktop only; phones show one panel, so check the app name and logo on the form itself.

## Words

Three drafts for the Home heading, from the offer's promise and the members' phrases. Prefer the concrete ("my seedlings always die") to the abstract. Quote no real person.
