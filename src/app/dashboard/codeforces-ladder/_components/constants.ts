import { z } from "zod";

export const CFDifficultyLevels = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500,
] as const;

export const CFDifficultyLevelsSchema = z.object({
  difficulty: z.coerce
    .number()
    .refine((val): val is (typeof CFDifficultyLevels)[number] =>
      CFDifficultyLevels.includes(val as (typeof CFDifficultyLevels)[number])
    ),
});
