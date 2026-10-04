import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
export const SessionContext = createContext<Session | null>(null);
export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 15000 } },
});
