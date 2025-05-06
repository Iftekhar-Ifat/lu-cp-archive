import { type Leaderboard } from "@/utils/schema/leaderboard";

export function isolateTopThree(leaderboard: Leaderboard[]) {
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  return { topThree, rest };
}
