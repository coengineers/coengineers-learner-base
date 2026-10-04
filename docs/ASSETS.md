# Asset provenance and distribution review

Reviewed 4 October 2026. This inventory is not a blanket licence for the application or CoEngineers identity.

## Self-hosted fonts

The three self-hosted WOFF2 files are included in `apps/web/public/fonts/`. Their embedded name-table metadata was inspected using fontTools in an isolated tooling environment; no tooling dependency was added to the application.

| Family         | Embedded version    | Copyright year | Notice shipped with the font   |
| -------------- | ------------------- | -------------- | ------------------------------ |
| Inter          | 4.001;git-66647c0bb | 2016           | `/fonts/Inter-OFL.txt`         |
| Space Grotesk  | 2.000               | 2020           | `/fonts/SpaceGrotesk-OFL.txt`  |
| JetBrains Mono | 2.211               | 2020           | `/fonts/JetBrainsMono-OFL.txt` |

Each identifies its respective project authors. The SIL OFL 1.1 notices are included beside the fonts in the public assets directory, so source copies and Vite builds both include them. Sources: [Inter upstream v4.0 notice](https://raw.githubusercontent.com/rsms/inter/v4.0/LICENSE.txt), [Space Grotesk notice](https://raw.githubusercontent.com/google/fonts/main/ofl/spacegrotesk/OFL.txt), [JetBrains Mono notice](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt). Inter's upstream notice matches the 2016 copyright embedded in this binary; the current Google Fonts notice has a different year and was not used for Inter.

`font-inventory.json` records the versions, SHA-256 checksums and notice sources. The asset unit test detects unreviewed font additions, changed binaries or missing notices. Preserve the complete notices when copying or redistributing these files. Recheck the applicable terms when replacing or modifying a font; do not assume this inventory covers a new file.

## CoEngineers references

- `apps/web/public/brand/workbench.webp` is the CoEngineers workbench illustration packaged with this base app. SHA-256: `1ed86807873b9ede0c8a566cea2066cbbe0b6901583a28b45c931021309fdd5f`.
- `apps/web/src/ui/RoughIcon.tsx` is a local adaptation of the CoEngineers hand-drawn icon family.
- Wordmark, palette and layout follow the CoEngineers brand library. All required assets are local; this app has no runtime dependency on another CoEngineers project.

The CoEngineers artwork, icons and wordmark remain CoEngineers’ property. John authorised this public template on 2 October 2026. Learners may use its source and these assets in their own private app copies. This permission does not grant unrestricted use of the CoEngineers trademark or sublicensing rights. Do not apply the font licence to the artwork or application source.

The illustration can be removed or replaced through `brand.ts`; see [branding](BRANDING.md). Take your private copy through the template instructions in the README. Replace the CoEngineers identity with your own when making your app yours.

## Dependency notices

Lucide and other application libraries are dependency-managed in the lockfile. This font/artwork inventory does not replace a transitive dependency-licence review or the required notices in distributed bundles. The dependency vulnerability audit is a separate check and cannot establish licence compliance.
