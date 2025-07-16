import { z } from "zod";

const CFDifficultyLevels = [
  800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,
  2100, 2200, 2300, 2400, 2500,
] as const;

const CFDifficultyLevelsSchema = z.object({
  difficulty: z.coerce
    .number()
    .refine((val) =>
      CFDifficultyLevels.includes(val as (typeof CFDifficultyLevels)[number])
    ),
});

const CFProblemSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, { message: "Problem name must be at least 3 characters." })
    .max(100, { message: "Problem name must not exceed 100 characters." }),
  added_by: z.string().min(1, { message: "Problem creator needed" }),
  url: z.string().url({ message: "Please enter a valid URL." }),
  approved: z.boolean(),
  difficulty_level: z
    .number()
    .refine(
      (val) =>
        CFDifficultyLevels.includes(val as (typeof CFDifficultyLevels)[number]),
      {
        message: "Invalid difficulty level.",
      }
    ),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

const CFProblemFormSchema = CFProblemSchema.pick({
  title: true,
  url: true,
  difficulty_level: true,
});

export {
  CFProblemSchema,
  CFProblemFormSchema,
  CFDifficultyLevels,
  CFDifficultyLevelsSchema,
};
