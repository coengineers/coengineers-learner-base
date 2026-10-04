import { initTRPC, TRPCError } from "@trpc/server";
import {
  profileInput,
  profileOutput,
} from "../../../../packages/contracts/src";
import type { Services } from "../composition";
const t = initTRPC.context<{ services: Services }>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      message:
        error.code === "BAD_REQUEST"
          ? "Check the information and try again."
          : "We could not complete that request. Please try again.",
      data: { code: shape.data.code, httpStatus: shape.data.httpStatus },
    };
  },
});
const protectedProcedure = t.procedure.use(async ({ next }) => {
  try {
    return await next();
  } catch {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
export const appRouter = t.router({
  profile: protectedProcedure
    .output(profileOutput)
    .query(({ ctx }) => ctx.services.account.get()),
  saveProfile: protectedProcedure
    .input(profileInput)
    .output(profileOutput)
    .mutation(({ ctx, input }) => ctx.services.account.save(input.displayName)),
});
export type AppRouter = typeof appRouter;
