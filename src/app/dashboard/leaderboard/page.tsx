import { leaderboardSearchParamsSchema } from "@/utils/schema/leaderboard";
import LeaderboardSelectSection from "./_components/leaderboard-select-section";
import { notFound } from "next/navigation";

export type SearchParams =
  | {
      latest: boolean;
      year?: undefined;
      month?: undefined;
    }
  | {
      latest?: undefined;
      year: number;
      month: number;
    };

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const result = leaderboardSearchParamsSchema.safeParse(searchParams);

  if (!result.success) {
    notFound();
  }
  return (
    <div className="py-8">
      <div className="mb-4 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Leaderboard
          </span>
        </div>
      </div>
      <LeaderboardSelectSection searchParams={result.data} />
    </div>
  );
}
