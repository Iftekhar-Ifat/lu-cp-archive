import { type SearchParams } from "@/app/dashboard/leaderboard/page";
import {
  type LeaderboardDateType,
  type Leaderboard,
} from "@/utils/schema/leaderboard";

export function isolateTopThree(leaderboard: Leaderboard[]) {
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  return { topThree, rest };
}

export function getInitialDate(
  leaderboardDates: LeaderboardDateType[],
  searchParams: SearchParams
): { year: number; month: number } | null {
  if (searchParams.latest) {
    return leaderboardDates[0] || null;
  }

  const matchingDate = leaderboardDates.find(
    (date) =>
      date.year === searchParams.year && date.month === searchParams.month
  );

  return matchingDate || null;
}
