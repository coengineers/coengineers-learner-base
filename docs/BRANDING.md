# Make the base app your own

The default is a neutral "Your app" placeholder in the approved warm editorial style: there is no logo and no business name until you set one. Brand identity is separate from account, file and business behaviour.

Edit **apps/web/src/brand.ts**. This is the only file you need for the app name, optional logo, illustration, sign-in introduction, footer, palette and font roles. The first step after copying the template is to set `name`, `appLabel` and `topBarLabel`.

These fields set who the app says it is:

- `name`: your business or app name, shown as the wordmark when there is no logo, in the browser tab title and as the logo's accessible name.
- `appLabel`: a short line under the name (for example "Client portal"); it is hidden when it is the same as `name`.
- `topBarLabel`: the first part of the breadcrumb in the top bar of the signed-in app.
- `logoUrl`: the path to your logo file, for example `/brand/logo.svg`, with the file saved in `apps/web/public/brand`; leave it `null` to show the name as text instead.
- `logoIncludesName`: set `true` when the logo image already spells the name (a wordmark), so the name is not shown a second time as text; leave `false` for an icon-only logo, which then gets the name beside it on the sign-in form.
- `signInHeading`: the large heading in the story panel beside the sign-in form (hidden on phones).
- `signInFormHeading`: the heading above the sign-in form itself, which stays on every screen size.

For a wordmark logo: copy it to `apps/web/public/brand/logo.svg`, set `logoUrl` to `"/brand/logo.svg"` and `logoIncludesName` to `true`. Set `wordmarkAccent` to an empty string unless you want part of the name underlined in text form. Keep untrusted customer-uploaded SVGs out of public brand assets.

Sign-in, account creation and recovery show the configured name, app label and optional logo beside the form on phones and desktops. Without a logo, the name remains as a wordmark. Keep the shared layout, type roles, spacing and status colours.

The default palette uses paper #FBFAF8, warm chrome #F2EFE8, charcoal #232421 and orange #F7931A with dark text. It uses self-hosted Space Grotesk, Inter and JetBrains Mono. Font files and artwork are included locally.

When replacing colours, change the whole semantic set together. Check text contrast, primary-button text, focus and input boundaries. Run pnpm verify and review desktop/mobile screens. Do not change success/error colours to match a brand: they communicate status.

A product may replace the illustration or set illustrationUrl to an empty string. No source-code colour hunt or changes to product logic should be needed. Future product pages must consume the semantic CSS variables rather than hard-coded colours.

## Asset provenance

- Workbench plate: CoEngineers workbench illustration, packaged with this app.
- RoughIcon component: local adaptation of the CoEngineers hand-drawn icon family.
- Fonts: self-hosted Space Grotesk, Inter and JetBrains Mono, with notices.
- Design reference: the CoEngineers brand library.

See [asset provenance and distribution review](ASSETS.md) for font versions/notices and the permission for learners to use the source, artwork, icons and wordmark in their own private copies. The font notices ship alongside the self-hosted files. Broader public source-distribution terms are not implied.
