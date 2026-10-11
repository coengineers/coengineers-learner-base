// Decides what the Brand component shows. Kept apart from the component so it can be unit tested.
export type BrandIdentityInput = {
  name: string;
  logoUrl: string | null;
  logoIncludesName: boolean;
};

export function brandIdentity(input: BrandIdentityInput, showName: boolean) {
  const showLogo = Boolean(input.logoUrl);
  // The name text shows when there is no logo (the name-only fallback), or when the
  // caller asks for the name beside a logo that does not already spell it.
  const showText = !showLogo || (showName && !input.logoIncludesName);
  // A logo with no text beside it is the only place the name is announced.
  const logoAlt = showText ? "" : input.name;
  return { showLogo, showText, logoAlt };
}
