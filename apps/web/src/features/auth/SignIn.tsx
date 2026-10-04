import { useState, type FormEvent } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { auth, config } from "../../lib/client";
import { Notice } from "../../ui/primitives";
import { Brand } from "../../ui/Brand";
import { brand } from "../../brand";
export function SignIn() {
  const [mode, setMode] = useState<"signin" | "signup" | "recover">("signin");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password") ?? "");
    try {
      const result =
        mode === "recover"
          ? await auth.auth.resetPasswordForEmail(email, {
              redirectTo: location.origin + "/account",
            })
          : mode === "signup"
            ? await auth.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: location.origin },
              })
            : await auth.auth.signInWithPassword({ email, password });
      if (result.error)
        setError(
          mode === "signin"
            ? "We could not sign you in. Check your email and password."
            : "We could not complete that request. Please try again.",
        );
      else if (mode === "recover")
        setMessage(
          config.local
            ? "If that account exists, a recovery link is in the local email inbox."
            : "If that account exists, check your email for a recovery link.",
        );
      else if (
        mode === "signup" &&
        !("session" in result.data && result.data.session)
      )
        setMessage("Check your email to finish creating your account.");
    } catch {
      setError("We cannot connect right now. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="auth-page" role="main">
      <section className="auth-story">
        <a className="brand" href="/">
          <Brand />
        </a>
        <div className="auth-story-content">
          <span className="eyebrow">{brand.signInEyebrow}</span>
          <h2>{brand.signInHeading}</h2>
          <p>{brand.signInDescription}</p>
          {brand.illustrationUrl && (
            <div className="auth-art">
              <img src={brand.illustrationUrl} alt="" />
            </div>
          )}
        </div>
        <span className="auth-credit">{brand.footer}</span>
      </section>
      <section className="auth-form-side">
        <div className="auth-card">
          {config.local && (
            <span className="preview-badge">
              <span />
              Local preview · practice accounts only
            </span>
          )}
          <p className="eyebrow">{brand.workspaceLabel}</p>
          <h1>
            {mode === "signup"
              ? brand.signUpHeading
              : mode === "recover"
                ? "Let’s get you back in."
                : brand.signInFormHeading}
          </h1>
          <p>
            {mode === "signup"
              ? brand.signUpDescription
              : mode === "recover"
                ? "We’ll send you a link to reset your password."
                : brand.signInFormDescription}
          </p>
          <form onSubmit={(event) => void submit(event)}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            {mode !== "recover" && (
              <>
                <div className="label-row">
                  <label htmlFor="password">Password</label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => {
                        setMode("recover");
                        setError("");
                      }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  minLength={mode === "signup" ? 12 : undefined}
                  required
                />
                {mode === "signup" && (
                  <small className="field-hint">
                    {config.local
                      ? "Use at least 12 characters. Use a practice password here."
                      : "Use at least 12 characters and a password unique to this app."}
                  </small>
                )}
              </>
            )}
            <button className="primary full" disabled={pending}>
              {pending
                ? "One moment…"
                : mode === "signup"
                  ? config.local
                    ? "Create practice account"
                    : "Create account"
                  : mode === "recover"
                    ? "Send recovery link"
                    : "Sign in"}
              <ArrowRight size={17} />
            </button>
          </form>
          {error && <Notice error>{error}</Notice>}
          {message && (
            <Notice>
              {message}
              {config.local && mode === "recover" && (
                <>
                  {" "}
                  <a
                    href="http://127.0.0.1:58324"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open local email inbox
                  </a>
                </>
              )}
            </Notice>
          )}
          <p className="auth-switch">
            {mode === "signin"
              ? "First time here? "
              : "Already have an account? "}
            <button
              className="text-button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
                setMessage("");
              }}
            >
              {mode === "signin"
                ? config.local
                  ? "Create a practice account"
                  : "Create an account"
                : "Sign in"}
            </button>
          </p>
          <div className="privacy-note">
            <ShieldCheck size={19} />
            <span>
              {config.local
                ? "This preview runs on your computer. Use made-up details while you explore."
                : brand.signInPrivacyNote}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
