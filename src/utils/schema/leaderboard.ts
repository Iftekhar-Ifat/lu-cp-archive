import { z } from "zod";

const currentYear = new Date().getFullYear();

const leaderboardSearchParamsSchema = z
  .union([
    // Case 1: latest=true (other fields forbidden)
    z.object({
      latest: z.literal("true"),
      year: z.undefined(),
      month: z.undefined(),
    }),
    // Case 2: year and month provided (latest forbidden)
    z.object({
      latest: z.undefined(),
      year: z
        .string()
        .transform(Number)
        .refine((val) => val >= 2025 && val <= currentYear),
      month: z
        .string()
        .transform(Number)
        .refine((val) => val >= 1 && val <= 12),
    }),
  ])
  .transform((data) => {
    if ("latest" in data) {
      return { latest: true };
    }
    return { year: data.year, month: data.month };
  });

const leaderboardDataSchema = z.object({
  rank: z.number(),
  points: z.number(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    user_name: z.string(),
  }),
});

export type Leaderboard = z.infer<typeof leaderboardDataSchema>;

export { leaderboardSearchParamsSchema, leaderboardDataSchema };
