export function normaliseDisplayName(name: string): string {
  const clean = name.trim().replace(/\s+/g, " ");
  if (!clean || clean.length > 80) throw new Error("Invalid display name");
  return clean;
}
