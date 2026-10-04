import { useState, useEffect, useContext, useRef } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Folder,
  UserRound,
  CircleHelp,
  Layers,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { SessionContext, queryClient } from "../lib/session";
import { auth, config } from "../lib/client";
import { SignIn } from "../features/auth/SignIn";
import { Notice } from "./primitives";
import { Brand } from "./Brand";
import { brand } from "../brand";
import { RoughIcon } from "./RoughIcon";
const nav = [
  { to: "/", text: brand.navHome, icon: Home },
  { to: "/files", text: brand.navFiles, icon: Folder },
  { to: "/account", text: brand.navAccount, icon: UserRound },
  { to: "/guide", text: brand.navGuide, icon: CircleHelp },
] as const;
function Navigation() {
  return (
    <nav aria-label="Main navigation">
      {nav.map(({ to, text }) => (
        <Link
          key={to}
          to={to}
          className="nav-link"
          activeProps={{
            className: "nav-link active",
            "aria-current": "page",
          }}
          activeOptions={{ exact: true }}
        >
          <RoughIcon
            name={
              to === "/"
                ? "workshop"
                : to === "/files"
                  ? "vault"
                  : to === "/account"
                    ? "community"
                    : "question"
            }
            draw={false}
          />
          {text}
        </Link>
      ))}
    </nav>
  );
}
export function Shell() {
  const session = useContext(SessionContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = mobileDialog.current;
    if (mobileOpen && element) {
      element.showModal();
      return () => element.close();
    }
  }, [mobileOpen]);
  const [signoutError, setSignoutError] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    setMobileOpen(false);
    document.getElementById("main-content")?.focus();
  }, [pathname]);
  if (!session) return <SignIn />;
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <dialog
        id="mobile-navigation"
        ref={mobileDialog}
        aria-label="Workspace navigation"
        className="mobile-navigation"
        onCancel={() => setMobileOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const elements = event.currentTarget.querySelectorAll<HTMLElement>(
            "a[href], button:not(:disabled)",
          );
          const first = elements[0],
            last = elements[elements.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="mobile-navigation-heading">
          <Brand compact />
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <Navigation />
      </dialog>
      <aside aria-label="Workspace" className="sidebar">
        <Link to="/" className="brand">
          <Brand />
        </Link>
        <div className="workspace-label">{brand.workspaceLabel}</div>
        <Navigation />
        <div className="sidebar-bottom">
          <div className="foundation-note">
            <span className="tiny-icon">
              <Sparkles size={18} />
            </span>
            <strong>{brand.sidebarHeading}</strong>
            <p>{brand.sidebarDescription}</p>
            <Link to="/guide">
              {brand.sidebarLink} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="sidebar-footer">
            <span>
              {brand.footer}
              <small>{brand.sidebarEdition}</small>
            </span>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={20} />
            </button>
            <span>{brand.topBarLabel}</span>
            <ChevronRight size={14} />
            <strong>
              {nav.find((n) => n.to === pathname)?.text ?? "Page"}
            </strong>
          </div>
          <div className="topbar-actions">
            {config.local && (
              <span className="preview-badge">
                <span />
                Local preview
              </span>
            )}
            <Link to="/account" className="avatar" aria-label="Open my account">
              <UserRound size={19} />
            </Link>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          <Outlet />
          {signoutError && <Notice error>{signoutError}</Notice>}
        </main>
        <footer className="main-footer">
          <span>{brand.mainFooter}</span>
          <button
            className="text-button"
            onClick={() =>
              void auth.auth.signOut().then(({ error }) => {
                if (error)
                  setSignoutError("Could not sign out. Please try again.");
                else queryClient.clear();
              })
            }
          >
            <LogOut size={15} /> Sign out
          </button>
        </footer>
      </div>
    </div>
  );
}
