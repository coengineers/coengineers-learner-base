# CoEngineers house style

Use this only when the founder's second brain has no `brand/DESIGN.md` yet. Tell the founder once that you have used the CoEngineers style, and that week 4 gives them their own.

Warm editorial: calm, premium, content first. Warm paper ground, near-black ink, and one orange used only on the thing that matters.

## Colour

| Token | Value | Use |
|---|---|---|
| `colour.canvas` | `#FBFAF8` | Page background (warm paper) |
| `colour.surface` | `#FFFFFF` | Cards and illustration stages |
| `colour.recessed` | `#F2EFE8` | Side panels, quiet bands |
| `colour.ink` | `#232421` | Body and heading text |
| `colour.muted` | `#696961` | Secondary text (check contrast) |
| `colour.primary` | `#F7931A` | The one accent: primary action, progress, a key figure |
| `colour.on-primary` | `#101014` | Text on orange. Never white on orange |
| `colour.hairline` | `#E9E7E1` | Quiet separators |
| `colour.focus` | `#A35809` | Focus ring, 3px with an offset |
| `colour.band` | `#1A1A1A` | Rare dark statement band, paper text on it |
| `colour.secondary` | `#232421` | No second brand colour: quiet actions use ink |
| `colour.on-secondary` | `#FBFAF8` | Text on secondary |
| `colour.primary-soft` | `#FDE9CC` | Soft tint behind a highlighted figure |
| `colour.secondary-soft` | `#F2EFE8` | Soft quiet tint |
| `colour.field-border` | `#8C877C` | Form field outline (meets 3:1) |

Orange is restrained: never a broad wash, never decoration, never for status alone.

## Type

| Token | Value |
|---|---|
| `font.display` | Space Grotesk, weight 500 to 600, sentence case |
| `font.body` | Inter, 16 to 18px, line height about 1.65 |
| `font.mono` | JetBrains Mono, only for small facts and figures |
| `font.stylesheet` | `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap` |

Reading width about 65 to 75 characters. Headings: page 34 to 46px, section 23 to 26px.

## Space and shape

- Spacing scale `space.1` to `space.7`: 8, 12, 16, 24, 32, 48, 64px.
- `radius.card` 18px, `radius.image` 12px (10 to 16px), `radius.button` 9px (inputs too), `radius.pill` 999px.
- Fewer boxes: use headings and space before borders. Shadows, if any, barely visible.

## Wordmark and imagery

- On a founder's own output, the wordmark is their business name set in `font.display` (they have no logo until week 4). The CoEngineers wordmark ("Co" in orange, "Engineers" in ink) is only for CoEngineers' own pages.
- Real photos first. Generated images only to set a scene, labelled "Illustrative". Never generate evidence.
- Hand-drawn line illustrations suit the style. No gradients, no stock-photo handshakes.

## Words

British English. No em dashes. Plain, warm, no jargon.

## Token names

Every skill uses these exact names (`colour.*`, `font.*` including `font.stylesheet`, `space.*`, `radius.*`), so a founder's `DESIGN.md` from week 4 fills every template with no change. A template that says `{{font.link}}` or `{{font.url}}` means `font.stylesheet`.
