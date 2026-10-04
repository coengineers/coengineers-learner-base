/*
 * The Season 3 26-mark icon family, shared with the website (its
 * components/living/RoughIcon.tsx is the original). Hand-authored
 * wobbly-marker SVGs in the plate stroke language: ink strokes with the
 * orange accent on the stroke that matters. Marks draw themselves once on
 * mount (the Living Whiteboard gesture); reduced motion resolves
 * immediately to the final drawn state (see .rough-icon in globals.css).
 *
 * The website version drives the draw with framer-motion; this port is
 * CSS-only because the CRM's dependency policy has no motion library and
 * needs none for a one-shot draw.
 *
 * TODO(shared-ui): one icon source across website/LMS/CRM once the shared
 * UI package is extracted.
 */

export type RoughIconName =
  | "arrow-right"
  | "arrow-up-right"
  | "book"
  | "box"
  | "brain"
  | "calendar"
  | "clock"
  | "community"
  | "email"
  | "flag"
  | "graph"
  | "lock"
  | "map-pin"
  | "mentor"
  | "mug"
  | "offer"
  | "phone"
  | "question"
  | "scale"
  | "ship"
  | "star"
  | "tag"
  | "tick"
  | "vault"
  | "video"
  | "workshop";

type PathSpec = { d: string; accent?: boolean };

const ICONS: Record<RoughIconName, PathSpec[]> = {
  vault: [
    { d: "M9 19V10.5C9 7 11.7 5 15 5h18c3.3 0 6 2.6 6 6v27H9V19Z" },
    { d: "M14 12c7-1 15-1.2 21 .2M15 18h18v16H15Z" },
    {
      d: "M22 23c3-2.2 7 .2 7 3.2 0 2.4-1.7 4.3-4.5 4.3S20 29.2 20 27",
      accent: true,
    },
  ],
  offer: [
    { d: "M7 18 22 7h18v18L25 40 7 22Z" },
    { d: "M31 14.5h.1" },
    { d: "M17 22h14M15 27h11", accent: true },
  ],
  ship: [
    { d: "m8 15 16-8 16 8-16 9L8 15Zm0 0v18l16 8 16-8V15M24 24v17" },
    { d: "m14 28 6 3", accent: true },
  ],
  scale: [
    { d: "M9 39V9M9 39h31" },
    { d: "m14 33 7-8 6 3 10-14" },
    { d: "m31 14 6-.3.4 6", accent: true },
  ],
  calendar: [
    { d: "M9 11h30v28H9V11Zm0 9h30M16 7v8M32 7v8" },
    { d: "M16 27h6v6h-6z", accent: true },
  ],
  workshop: [
    { d: "M7 12h34v23H7zM15 41h18M19 35v6M29 35v6" },
    { d: "m15 27 6-7 5 4 7-8", accent: true },
  ],
  mentor: [
    { d: "M8 12h23v27H8zM17 18h14M17 24h10M17 30h8" },
    { d: "m27 35 10-18 4 3-10 18-5 3 1-6Z", accent: true },
  ],
  community: [
    {
      d: "M18 24c-4.5 0-8-3.3-8-7.5S13.5 9 18 9s8 3.3 8 7.5S22.5 24 18 24Zm13-1c3.6 0 6.5-2.7 6.5-6s-2.9-6-6.5-6",
    },
    {
      d: "M5 40c.5-8 5-12 13-12s12.5 4 13 12M29 28c7-.4 11 3.4 12 9",
      accent: true,
    },
  ],
  brain: [
    // A lobed brain-cloud centred in the box; the old outline chain drifted
    // off-centre and left a stray flap hanging outside the shape.
    {
      d: "M18 10c-4-2-9 1-8 6-4 1-5 7-1 9-3 3-1 8 3 8 0 4 5 6 8 4 2 3 7 3 9 0 4 2 8 0 8-4 4 0 6-5 4-8 4-2 3-8-1-9 1-5-4-8-8-6-3-3-9-3-11 0Z",
    },
    { d: "M24 14v20M17 20c4 0 7 3 7 7M31 19c-4 1-7 4-7 8", accent: true },
  ],
  tag: [
    { d: "M7 20 21 7h18v18L25 40 7 23Z" },
    { d: "M31 14h.1M16 22h14", accent: true },
  ],
  box: [{ d: "m8 15 16-8 16 8-16 9L8 15Zm0 0v18l16 8 16-8V15M24 24v17" }],
  graph: [
    { d: "M9 39V9M9 39h31M15 34v-7h6v7M25 34V21h6v13M35 34V13h6" },
    { d: "M15 18c8 1 14-3 21-9", accent: true },
  ],
  book: [
    {
      d: "M7 10c7-2 13-1 17 3v27c-4-4-10-5-17-2V10Zm34 0c-7-2-13-1-17 3v27c4-4 10-5 17-2V10Z",
    },
    { d: "M13 18c3-.7 6-.3 8 1M13 24c3-.5 6 0 8 1", accent: true },
  ],
  video: [
    { d: "M8 12h25v25H8zM33 20l8-5v19l-8-5Z" },
    { d: "m18 19 9 5-9 6Z", accent: true },
  ],
  email: [
    { d: "M7 12h34v25H7zM8 14l16 13 16-13M8 35l11-10M40 35 29 25" },
    { d: "m19 25 5 4 5-4", accent: true },
  ],
  lock: [
    { d: "M10 21h28v20H10zM16 21v-6c0-6 3-9 8-9s8 3 8 9v6" },
    { d: "M24 28v7", accent: true },
  ],
  tick: [
    // A full hand-drawn circle with the check contained inside it.
    { d: "M15 25c2 2 4 5 6 7 3-7 8-14 12-19", accent: true },
    { d: "M23 8c9-1 17 7 17 16 0 9-8 17-17 16-8 0-15-7-15-16 0-8 7-15 15-16Z" },
  ],
  "arrow-right": [
    { d: "M7 25c10-2 20-2 32-1" },
    { d: "m31 15 9 9-9 10", accent: true },
  ],
  "arrow-up-right": [
    { d: "M9 39c7-10 17-19 29-29" },
    { d: "m27 9 12 .5-1 12", accent: true },
  ],
  phone: [
    {
      d: "M15 6h18c2 0 3 2 3 4v29c0 2-1 3-3 3H15c-2 0-3-1-3-3V10c0-2 1-4 3-4Zm5 5h8M22 36h4",
    },
    { d: "M18 17h12v12H18z", accent: true },
  ],
  mug: [
    {
      d: "M9 15h25v20c-2 5-6 7-12 7s-11-2-13-7V15Zm25 5c9-1 10 4 7 9-2 3-5 4-7 3",
    },
    { d: "M15 7c-2 3 2 4 0 7M23 6c-2 3 2 4 0 7", accent: true },
  ],
  flag: [
    { d: "M13 42V7M14 9c8-4 14 5 23 0v16c-9 5-15-4-23 0" },
    { d: "M9 42h11", accent: true },
  ],
  star: [
    { d: "m24 6 5 12 13 1-10 8 4 13-12-7-12 7 4-13-10-8 13-1Z", accent: true },
  ],
  question: [
    { d: "M15 17c0-7 4-11 10-11 7 0 11 4 10 9-1 7-10 7-10 14M25 38h.1" },
    { d: "M20 42c3 .8 7 .8 10 0", accent: true },
  ],
  clock: [
    { d: "M24 6c10 0 18 8 18 18s-8 18-18 18S6 34 6 24 14 6 24 6Z" },
    { d: "M24 12v13l9 5", accent: true },
  ],
  "map-pin": [
    { d: "M24 43S10 31 10 20c0-8 6-14 14-14s14 6 14 14c0 11-14 23-14 23Z" },
    { d: "M24 14c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7Z", accent: true },
  ],
};

export const ROUGH_ICON_NAMES = Object.keys(ICONS) as RoughIconName[];

export function RoughIcon({
  name,
  label,
  className = "",
  draw = true,
}: {
  name: RoughIconName;
  label?: string;
  className?: string;
  draw?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`rough-icon ${draw ? "rough-icon--draw" : ""} ${className}`}
      fill="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {label && <title>{label}</title>}
      {ICONS[name].map((path, index) => (
        <path
          key={`${name}-${index}`}
          d={path.d}
          pathLength={1}
          className={path.accent ? "rough-icon__accent" : undefined}
          style={draw ? { animationDelay: `${index * 70}ms` } : undefined}
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
