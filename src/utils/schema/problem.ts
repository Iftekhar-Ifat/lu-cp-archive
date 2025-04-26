import { DifficultySchema, StatusSchema } from "@/types/types";
import { z } from "zod";

export const MAX_PROBLEM_TAG_LENGTH = 5;

// Validation schema for the contest form
const ProblemSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, { message: "Problem name must be at least 3 characters." })
    .max(100, { message: "Problem name must not exceed 100 characters." }),
  description: z
    .string()
    .min(3, { message: "Problem description must be at least 3 characters" })
    .max(200, { message: "Description cannot exceed 200 characters." }),
  added_by: z.string().min(1, { message: "Problem creator needed" }),
  url: z.string().url({ message: "Please enter a valid URL." }),
  tags: z
    .array(z.string())
    .min(1, { message: "Please add at least one tag" })
    .max(5, { message: "Maximum 5 tags allowed" }),
  status: StatusSchema,
  difficulty: DifficultySchema,
  topic: z.string().min(1, { message: "Problem topic needed" }),
  approved: z.boolean(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

const ProblemFormSchema = ProblemSchema.pick({
  title: true,
  description: true,
  url: true,
  tags: true,
  difficulty: true,
});

export { ProblemSchema, ProblemFormSchema };
