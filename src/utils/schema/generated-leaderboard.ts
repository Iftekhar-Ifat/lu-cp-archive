import { z } from "zod";

const generatedLeaderboardDataSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    user_name: z.string(),
  }),
  rank: z.number(),
  generated_point: z.number(),
  additional_points: z.number(),
  total_points: z.number(),
});

export type GeneratedLeaderboard = z.infer<
  typeof generatedLeaderboardDataSchema
>;
