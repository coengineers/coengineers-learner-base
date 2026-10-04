import { z } from "zod";
export const profileInput = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(1, "Enter your name.")
      .max(80, "Use 80 characters or fewer."),
  })
  .strict();
export const profileOutput = z.object({
  id: z.string().uuid(),
  displayName: z.string().max(80),
});
export const fileName = z
  .string()
  .min(1)
  .max(160)
  .regex(
    /^[a-zA-Z0-9][a-zA-Z0-9._ -]*$/,
    "Use letters, numbers, spaces, dots or dashes.",
  );
export const fileOutput = z.object({
  name: fileName,
  size: z.number().nonnegative(),
  createdAt: z.string(),
});
export type Profile = z.infer<typeof profileOutput>;
export type PrivateFile = z.infer<typeof fileOutput>;
export const mimeTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "text/plain",
];
export const maxFileBytes = 2 * 1024 * 1024;
