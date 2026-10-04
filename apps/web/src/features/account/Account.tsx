import { brand } from "../../brand";
import { useState, useContext, type FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRound, Check, ShieldCheck } from "lucide-react";
import { auth, api } from "../../lib/client";
import { SessionContext } from "../../lib/session";
import { Notice, PageHeading } from "../../ui/primitives";
export function Account() {
  const session = useContext(SessionContext)!;
  const qc = useQueryClient();
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.profile.query(),
  });
  const [name, setName] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (displayName: string) =>
      api.saveProfile.mutate({ displayName }),
    onSuccess: (data) => {
      qc.setQueryData(["profile"], data);
      setName(null);
    },
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = String(new FormData(form).get("newPassword"));
    const { error } = await auth.auth.updateUser({ password });
    if (error) {
      setPasswordError(
        "Password could not be changed. Use a fresh recovery link and try again.",
      );
      setPasswordMessage("");
    } else {
      setPasswordMessage("Your password has been changed.");
      setPasswordError("");
      form.reset();
    }
  }
  return (
    <>
      <PageHeading eyebrow={brand.accountEyebrow} title={brand.accountHeading}>
        {brand.accountDescription}
      </PageHeading>
      <div className="settings-layout">
        <section className="panel">
          <div className="panel-heading">
            <UserRound size={21} />
            <h2>Your details</h2>
          </div>
          {profile.isError ? (
            <Notice error>
              We could not load your details.{" "}
              <button
                className="text-button"
                onClick={() => void profile.refetch()}
              >
                Try again
              </button>
            </Notice>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(name ?? profile.data?.displayName ?? "");
              }}
            >
              <label htmlFor="display-name">Your name</label>
              <input
                id="display-name"
                value={name ?? profile.data?.displayName ?? ""}
                onChange={(e) => {
                  setName(e.target.value);
                  mutation.reset();
                }}
                maxLength={80}
                required
                placeholder="What should we call you?"
                autoComplete="name"
                disabled={profile.isPending}
              />
              <p className="field-hint">{brand.accountNameHint}</p>
              <label htmlFor="account-email">Email address</label>
              <input
                id="account-email"
                value={session.user.email ?? ""}
                readOnly
              />
              <p className="field-hint">Your sign-in address.</p>
              <div className="form-footer">
                <button
                  className="primary"
                  disabled={mutation.isPending || profile.isPending}
                >
                  {mutation.isPending ? "Saving…" : "Save changes"}
                  <Check size={17} />
                </button>
              </div>
              {mutation.isSuccess && (
                <Notice>Your details have been saved.</Notice>
              )}
              {mutation.isError && (
                <Notice error>
                  We could not save your changes. Your entry is still here.
                  Please try again.
                </Notice>
              )}
            </form>
          )}
        </section>
        <aside aria-label="Account guidance" className="help-panel">
          <ShieldCheck size={27} />
          <h3>{brand.accountHelpHeading}</h3>
          <p>{brand.accountHelpDescription}</p>
          <p>{brand.accountPrivacyNote}</p>
        </aside>
      </div>
      <section className="panel password-panel">
        <h2>Change your password</h2>
        <p>After following a recovery link, set your new password here.</p>
        <form onSubmit={(event) => void updatePassword(event)}>
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            minLength={12}
            required
          />
          <button className="secondary" type="submit">
            Update password
          </button>
        </form>
        {passwordMessage && <Notice>{passwordMessage}</Notice>}
        {passwordError && <Notice error>{passwordError}</Notice>}
      </section>
    </>
  );
}
