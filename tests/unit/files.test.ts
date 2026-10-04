import { expect, it, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { fileStore } from "../../apps/api/src/modules/files/infrastructure/supabase";

function fixture() {
  const bucket = {
    list: vi.fn().mockResolvedValue({ data: [], error: null }),
    upload: vi.fn().mockResolvedValue({ error: null }),
    download: vi
      .fn()
      .mockResolvedValue({ data: new Blob(["example"]), error: null }),
    remove: vi.fn().mockResolvedValue({ error: null }),
  };
  const from = vi.fn().mockReturnValue(bucket);
  return {
    bucket,
    from,
    store: fileStore(
      { storage: { from } } as unknown as SupabaseClient,
      "verified-actor",
    ),
  };
}

it("scopes every storage operation to the verified actor and prevents overwrite", async () => {
  const { store, bucket, from } = fixture();
  const body = new ArrayBuffer(4);
  await store.list();
  await store.upload("note.txt", body, "text/plain");
  expect(await (await store.download("note.txt")).text()).toBe("example");
  await store.remove("note.txt");
  expect(from).toHaveBeenCalledWith("private-files");
  expect(bucket.list).toHaveBeenCalledWith(
    "verified-actor",
    expect.objectContaining({ limit: 100 }),
  );
  expect(bucket.upload).toHaveBeenCalledWith("verified-actor/note.txt", body, {
    contentType: "text/plain",
    upsert: false,
  });
  expect(bucket.download).toHaveBeenCalledWith("verified-actor/note.txt");
  expect(bucket.remove).toHaveBeenCalledWith(["verified-actor/note.txt"]);
});

it("maps file metadata and excludes virtual directories", async () => {
  const { store, bucket } = fixture();
  bucket.list.mockResolvedValue({
    data: [
      { id: null, name: "directory" },
      {
        id: "file",
        name: "note.txt",
        created_at: "2026-09-20",
        metadata: { size: 8 },
      },
    ],
    error: null,
  });
  expect(await store.list()).toEqual([
    { name: "note.txt", size: 8, createdAt: "2026-09-20" },
  ]);
});

it("reports duplicate uploads without exposing provider details", async () => {
  const { store, bucket } = fixture();
  bucket.upload.mockResolvedValue({
    error: { message: "Object already exists: private-provider-detail" },
  });
  await expect(
    store.upload("note.txt", new ArrayBuffer(0), "text/plain"),
  ).rejects.toThrow(/^FILE_EXISTS$/);
});

it.each(["list", "upload", "download", "remove"] as const)(
  "sanitises %s provider failures",
  async (operation) => {
    const { store, bucket } = fixture();
    bucket[operation].mockResolvedValue({
      error: { message: "private-provider-detail" },
    });
    const result =
      operation === "list"
        ? store.list()
        : operation === "upload"
          ? store.upload("note.txt", new ArrayBuffer(0), "text/plain")
          : store[operation]("note.txt");
    await expect(result).rejects.toThrow(/^DEPENDENCY_UNAVAILABLE$/);
  },
);
