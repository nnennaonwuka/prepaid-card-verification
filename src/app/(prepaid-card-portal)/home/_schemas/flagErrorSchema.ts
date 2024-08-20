import { z } from "zod";

export const flagErrorFormSchema = z.object({
  reason: z.string().min(1, "Select a reason"),
});
