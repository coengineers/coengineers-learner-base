import { brand } from "./brand";
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Link,
} from "@tanstack/react-router";
import { SessionContext, queryClient } from "./lib/session";
import { auth } from "./lib/client";
import { PageHeading } from "./ui/primitives";
import { Shell } from "./ui/Shell";
import { Overview } from "./features/overview/Overview";
import { Account } from "./features/account/Account";
import { Files } from "./features/files/Files";
import { Guide } from "./features/guide/Guide";
const rootRoute = createRootRoute({
  component: Shell,
  notFoundComponent: () => (
    <>
      <PageHeading
        eyebrow={brand.notFoundEyebrow}
        title={brand.notFoundHeading}
      >
        {brand.notFoundDescription}
      </PageHeading>
      <Link className="primary" to="/">
        Back to overview
      </Link>
    </>
  ),
});
const routeTree = rootRoute.addChildren([
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Overview,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/account",
    component: Account,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/files",
    component: Files,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/guide",
    component: Guide,
  }),
]);
const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    void auth.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = auth.auth.onAuthStateChange((_event, next) => {
      if (!next) queryClient.clear();
      setSession(next);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  if (loading)
    return (
      <div className="startup-error" role="status">
        Opening your workspace…
      </div>
    );
  return (
    <SessionContext.Provider value={session}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SessionContext.Provider>
  );
}
