import { brand } from "../../brand";
import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  Plus,
  Folder,
  FileText,
  Download,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import {
  fileOutput,
  maxFileBytes,
  mimeTypes,
} from "../../../../../packages/contracts/src";
import { privateRequest } from "../../lib/client";
import { Notice, PageHeading } from "../../ui/primitives";
export function Files() {
  const qc = useQueryClient();
  const files = useQuery({
    queryKey: ["files"],
    queryFn: async () =>
      z.array(fileOutput).parse(await (await privateRequest("/files")).json()),
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [removeName, setRemoveName] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (removeName && element) {
      element.showModal();
      element.querySelector("button")?.focus();
      return () => element.close();
    }
  }, [removeName]);
  async function upload(file: File) {
    setError("");
    setMessage("");
    if (file.size > maxFileBytes || !mimeTypes.includes(file.type)) {
      setError("Choose a PNG, JPG, WebP, PDF or text file under 2 MB.");
      return;
    }
    setBusy(true);
    try {
      await privateRequest("/files/" + encodeURIComponent(file.name), {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      await qc.invalidateQueries({ queryKey: ["files"] });
      setMessage("Your file has been saved privately.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Upload failed. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function download(name: string) {
    try {
      const blob = await (
        await privateRequest("/files/" + encodeURIComponent(name))
      ).blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = name;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("We could not download that file. Try again.");
    }
  }
  async function remove(name: string) {
    setBusy(true);
    try {
      await privateRequest("/files/" + encodeURIComponent(name), {
        method: "DELETE",
      });
      setRemoveName(null);
      await qc.invalidateQueries({ queryKey: ["files"] });
      setMessage("Your file was removed. This cannot be undone.");
    } catch {
      setError("We could not remove that file. Try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHeading eyebrow={brand.filesEyebrow} title={brand.filesHeading}>
        {brand.filesDescription}
      </PageHeading>
      <section className="panel files-panel">
        <div className="files-toolbar">
          <h2>
            Your files <span className="count">{files.data?.length ?? 0}</span>
          </h2>
          <label
            className={"primary upload-button " + (busy ? "disabled" : "")}
          >
            <Plus size={17} />
            {busy ? "Saving…" : "Add a file"}
            <input
              type="file"
              aria-label="Add a file"
              accept=".png,.jpg,.jpeg,.webp,.pdf,.txt"
              disabled={busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(file);
                event.target.value = "";
              }}
            />
          </label>
        </div>
        {error && <Notice error>{error}</Notice>}
        {message && <Notice>{message}</Notice>}
        {files.isPending ? (
          <p role="status">Loading your files…</p>
        ) : files.isError ? (
          <Notice error>
            We cannot load your files right now.{" "}
            <button
              className="text-button"
              onClick={() => void files.refetch()}
            >
              Try again
            </button>
          </Notice>
        ) : files.data.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">
              <Folder size={36} />
            </span>
            <h3>{brand.filesEmptyHeading}</h3>
            <p>
              Add your first document or image.
              <br />
              Only you can see the files you keep here.
            </p>
            <span className="field-hint">
              PNG, JPG, WebP, PDF or text · up to 2 MB each
            </span>
          </div>
        ) : (
          <ul className="file-list">
            {files.data.map((file) => (
              <li key={file.name}>
                <span className="file-icon">
                  <FileText size={23} />
                </span>
                <div className="file-description">
                  <strong>{file.name}</strong>
                  <small>
                    {Math.max(1, Math.ceil(file.size / 1024))} KB ·{" "}
                    {new Date(file.createdAt).toLocaleDateString("en-GB")}
                  </small>
                </div>
                <button
                  className="icon-button"
                  aria-label={"Download " + file.name}
                  onClick={() => void download(file.name)}
                >
                  <Download size={19} />
                </button>
                <button
                  className="icon-button"
                  aria-label={"Remove " + file.name}
                  onClick={() => setRemoveName(file.name)}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <p className="under-panel">
        <ShieldCheck size={16} />
        Private to your account. Up to 100 files shown, newest first.
      </p>
      {removeName && (
        <dialog
          ref={dialog}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="remove-title"
          className="modal"
          onCancel={() => setRemoveName(null)}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const buttons =
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                "button:not(:disabled)",
              );
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
        >
          <h2 id="remove-title">Remove this file?</h2>
          <p>
            “{removeName}” will be permanently removed. Keep a copy first if you
            need it.
          </p>
          <div className="modal-actions">
            <button
              autoFocus
              className="secondary"
              onClick={() => setRemoveName(null)}
            >
              Keep file
            </button>
            <button
              disabled={busy}
              className="danger"
              onClick={() => void remove(removeName)}
            >
              Remove file
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
