import { z } from "zod";

export const MAX_PROBLEM_TAG_LENGTH = 5;

// Validation schema for the problem form
const problemFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Problem name must be at least 3 characters.",
    })
    .max(100, {
      message: "Problem name must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(3, { message: "Problem description must be at least 3 characters" })
    .max(200, {
      message: "Description cannot exceed 200 characters.",
    }),
  link: z.string().url({
    message: "Please enter a valid URL.",
  }),
  tags: z
    .array(z.string())
    .min(1, { message: "Please add at least one tag" })
    .max(MAX_PROBLEM_TAG_LENGTH, { message: "Maximum 5 tags allowed" })
    .refine((tags) => new Set(tags).size === tags.length, {
      message: "Tags must be unique",
    }),
});

export { problemFormSchema };
