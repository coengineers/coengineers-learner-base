import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProfileRepository } from "../application/service";
import { profileOutput } from "../../../../../../packages/contracts/src";
export function profileRepository(
  client: SupabaseClient,
  actorId: string,
): ProfileRepository {
  return {
    async get() {
      const { data, error } = await client
        .from("profiles")
        .select("id, display_name")
        .eq("id", actorId)
        .maybeSingle();
      if (error) throw new Error("DEPENDENCY_UNAVAILABLE");
      return profileOutput.parse({
        id: actorId,
        displayName: data?.display_name ?? "",
      });
    },
    async save(displayName) {
      const { data, error } = await client
        .from("profiles")
        .upsert({
          id: actorId,
          display_name: displayName,
          updated_at: new Date().toISOString(),
        })
        .select("id, display_name")
        .single();
      if (error) throw new Error("DEPENDENCY_UNAVAILABLE");
      return profileOutput.parse({
        id: data.id,
        displayName: data.display_name,
      });
    },
  };
}
