import { z } from "zod";

const generatedLeaderboardDataSchema = z.object({
  rank: z.number(),
  generated_point: z.number(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    user_name: z.string(),
  }),
});

export type GeneratedLeaderboard = z.infer<
  typeof generatedLeaderboardDataSchema
>;
