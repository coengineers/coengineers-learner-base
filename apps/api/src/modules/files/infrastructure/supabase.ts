import type { SupabaseClient } from "@supabase/supabase-js";
import type { FileStore } from "../application/service";
import { fileOutput } from "../../../../../../packages/contracts/src";
export function fileStore(client: SupabaseClient, actorId: string): FileStore {
  const bucket = client.storage.from("private-files");
  return {
    async list() {
      const { data, error } = await bucket.list(actorId, {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });
      if (error) throw new Error("DEPENDENCY_UNAVAILABLE");
      return data
        .filter((f) => f.id)
        .map((f) =>
          fileOutput.parse({
            name: f.name,
            size: f.metadata?.size ?? 0,
            createdAt: f.created_at,
          }),
        );
    },
    async upload(name, body, contentType) {
      const { error } = await bucket.upload(actorId + "/" + name, body, {
        contentType,
        upsert: false,
      });
      if (error)
        throw new Error(
          error.message.includes("already exists")
            ? "FILE_EXISTS"
            : "DEPENDENCY_UNAVAILABLE",
        );
    },
    async download(name) {
      const { data, error } = await bucket.download(actorId + "/" + name);
      if (error) throw new Error("DEPENDENCY_UNAVAILABLE");
      return data;
    },
    async remove(name) {
      const { error } = await bucket.remove([actorId + "/" + name]);
      if (error) throw new Error("DEPENDENCY_UNAVAILABLE");
    },
  };
}
