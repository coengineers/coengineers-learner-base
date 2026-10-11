# Make the base app your own

The default is CoEngineers, using the approved warm editorial style. Brand identity is separate from account, file and business behaviour.

Edit **apps/web/src/brand.ts**. This is the only file you need for the app name, wordmark, optional logo, illustration, sign-in introduction, footer, palette and font roles.

For example, set name to your reviewed business name, set wordmarkAccent to an empty string, and place your logo in apps/web/public/brand. Set logoUrl to /brand/your-logo.svg. Keep untrusted customer-uploaded SVGs out of public brand assets.

Set `appLabel` to the learner's app name. Sign-in, account creation and recovery show the configured name, app label and optional logo beside the form on phones and desktops. A logo does not replace the visible name here, so an icon-only logo still identifies the app. Without a logo, the name remains as a wordmark. Keep the shared layout, type roles, spacing and status colours.

The default palette uses paper #FBFAF8, warm chrome #F2EFE8, charcoal #232421 and orange #F7931A with dark text. It uses self-hosted Space Grotesk, Inter and JetBrains Mono. Font files and artwork are included locally.

When replacing colours, change the whole semantic set together. Check text contrast, primary-button text, focus and input boundaries. Run pnpm verify and review desktop/mobile screens. Do not change success/error colours to match a brand: they communicate status.

A product may replace the illustration or set illustrationUrl to an empty string. No source-code colour hunt or changes to product logic should be needed. Future product pages must consume the semantic CSS variables rather than hard-coded colours.

## Asset provenance

- Workbench plate: CoEngineers workbench illustration, packaged with this app.
- RoughIcon component: local adaptation of the CoEngineers hand-drawn icon family.
- Fonts: self-hosted Space Grotesk, Inter and JetBrains Mono, with notices.
- Design reference: the CoEngineers brand library.

See [asset provenance and distribution review](ASSETS.md) for font versions/notices and the permission for learners to use the source, artwork, icons and wordmark in their own private copies. The font notices ship alongside the self-hosted files. Broader public source-distribution terms are not implied.
