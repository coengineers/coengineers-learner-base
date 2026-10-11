import { describe, expect, it } from "vitest";
import { brand } from "../../apps/web/src/brand";
import { brandIdentity } from "../../apps/web/src/ui/brandIdentity";

const wordmark = {
  name: "Second Wind",
  logoUrl: "/brand/logo.svg",
  logoIncludesName: true,
};

describe("brand identity", () => {
  it("shows the name as text when there is no logo", () => {
    const input = { ...wordmark, logoUrl: null };
    for (const showName of [false, true]) {
      expect(brandIdentity(input, showName)).toEqual({
        showLogo: false,
        showText: true,
        logoAlt: "",
      });
    }
  });
  it("shows the logo once, with no name text, when the logo already spells the name", () => {
    for (const showName of [false, true]) {
      expect(brandIdentity(wordmark, showName)).toEqual({
        showLogo: true,
        showText: false,
        logoAlt: "Second Wind",
      });
    }
  });
  it("keeps the name beside a logo that does not include it, where the name is asked for", () => {
    const icon = { ...wordmark, logoIncludesName: false };
    expect(brandIdentity(icon, false)).toEqual({
      showLogo: true,
      showText: false,
      logoAlt: "Second Wind",
    });
    expect(brandIdentity(icon, true)).toEqual({
      showLogo: true,
      showText: true,
      logoAlt: "",
    });
  });
});

describe("default brand", () => {
  it("is a neutral placeholder, not another business's identity", () => {
    expect(brand.name).toBe("Your app");
    expect(brand.appLabel).toBe("Your app");
    expect(brand.topBarLabel).toBe("Your app");
    expect(brand.wordmarkAccent).toBe("");
    expect(brand.logoUrl).toBeNull();
    expect(brand.logoIncludesName).toBe(false);
    expect(JSON.stringify(brand)).not.toMatch(/CoEngineers/i);
  });
});
