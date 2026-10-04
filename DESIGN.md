# Learner base app design

The default uses CoEngineers branding and its warm editorial style. Each learner can replace it with their own identity.

Use the approved warm editorial system: warm paper canvas, recessed 232px sidebar, white working surfaces, 18px cards, 9px controls, confident Space Grotesk headings, Inter body/UI and a quiet JetBrains Mono wordmark. Primary actions use restrained orange with dark text. Accessible fields and focus must remain clear.

Reuse the existing hand-drawn workbench plate and RoughIcon family. Lucide remains for utility controls. No gradients, glossy abstract stack artwork, decorative rainbow palettes or tiny essential labels. Keep the product-neutral scope.

Brand configuration lives in apps/web/src/brand.ts. Components consume semantic tokens. Do not encode a learner's identity in account, file or API modules. See docs/BRANDING.md.

Desktop, narrow layouts, keyboard, focus, reduced motion and error states must be checked after a theme change. A visual review does not imply release acceptance.
