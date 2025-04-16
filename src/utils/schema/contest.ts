import { ContestType, Difficulty } from "@/types/types";
import { z } from "zod";

export const MAX_CONTEST_TAG_LENGTH = 5;

// Validation schema for the contest form
const ContestSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, { message: "Contest name must be at least 3 characters." })
    .max(100, { message: "Contest name must not exceed 100 characters." }),
  description: z
    .string()
    .min(3, { message: "Contest description must be at least 3 characters" })
    .max(200, { message: "Description cannot exceed 200 characters." }),
  added_by: z.string().min(1, { message: "Contest creator needed" }),
  url: z.string().url({ message: "Please enter a valid URL." }),
  tags: z
    .array(z.string())
    .min(1, { message: "Please add at least one tag" })
    .max(5, { message: "Maximum 5 tags allowed" })
    .refine((tags) => new Set(tags).size === tags.length, {
      message: "Tags must be unique",
    }),
  difficulty: Difficulty,
  type: ContestType,
  approved: z.boolean(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

const ContestFormSchema = ContestSchema.pick({
  title: true,
  description: true,
  url: true,
  tags: true,
  difficulty: true,
});

export { ContestSchema, ContestFormSchema };
