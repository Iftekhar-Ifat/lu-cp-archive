import { z } from "zod";

// Validation schema for the topic-wise form
const topicFormSchema = z.object({
  name: z
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
});

export { topicFormSchema };
