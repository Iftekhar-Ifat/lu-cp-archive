import { z } from "zod";

// Validation schema for the contest form
const contestFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Contest name must be at least 3 characters.",
    })
    .max(100, {
      message: "Contest name must not exceed 100 characters.",
    }),
  description: z
    .string()
    .min(3, { message: "Contest description must be at least 3 characters" })
    .max(200, {
      message: "Description cannot exceed 200 characters.",
    }),
  link: z.string().url({
    message: "Please enter a valid URL.",
  }),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .min(1, { message: "Please add at least one tag" }),
});

export { contestFormSchema };
