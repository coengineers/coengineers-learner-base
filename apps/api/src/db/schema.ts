import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
// Migration adds the auth.users FK, RLS and Storage policies. Review SQL alongside this schema.
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  displayName: text("display_name").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
