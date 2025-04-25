import { z } from "zod";

const topicFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Contest name must be at least 3 characters.",
    })
    .max(50, {
      message: "Contest name must not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(3, { message: "Contest description must be at least 3 characters" })
    .max(100, {
      message: "Description cannot exceed 100 characters.",
    }),
  slug: z.string().regex(/^[a-z0-9-]+$/, {
    message:
      "Slug must only contain lowercase letters, numbers, and hyphens (no spaces or uppercase).",
  }),
});

export { topicFormSchema };
