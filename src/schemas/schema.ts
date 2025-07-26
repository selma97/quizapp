import { z } from "zod";

export const homeSchema = z.object({
  username: z.string().min(1),
  category: z.string().min(1),
  difficulty: z.string().min(1),
});

export type homeSchemaValues = z.infer<typeof homeSchema>;
