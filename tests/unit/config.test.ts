import { it, expect } from "vitest";
import { parseConfiguration } from "../../packages/config/src";
const base = {
  SUPABASE_URL: "http://127.0.0.1:58321",
  SUPABASE_PUBLISHABLE_KEY: "synthetic-publishable-value",
  APP_ORIGIN: "http://127.0.0.1:4310",
  APP_ENV: "local",
};
it("accepts a complete local configuration and strips undeclared bindings", () => {
  expect(
    parseConfiguration({ ...base, PRIVATE_VALUE: "never-shared" }),
  ).toEqual(base);
});
it.each(["SUPABASE_URL", "SUPABASE_PUBLISHABLE_KEY", "APP_ORIGIN", "APP_ENV"])(
  "rejects a missing %s",
  (key) => {
    const value: Record<string, unknown> = { ...base };
    delete value[key];
    expect(() => parseConfiguration(value)).toThrow();
  },
);
it("accepts HTTPS hosted configuration and rejects insecure origins", () => {
  const hosted = {
    ...base,
    APP_ENV: "production",
    APP_ORIGIN: "https://business.example",
    SUPABASE_URL: "https://example.supabase.co",
  };
  expect(parseConfiguration(hosted)).toEqual(hosted);
  expect(() =>
    parseConfiguration({ ...hosted, APP_ORIGIN: "http://business.example" }),
  ).toThrow();
});
