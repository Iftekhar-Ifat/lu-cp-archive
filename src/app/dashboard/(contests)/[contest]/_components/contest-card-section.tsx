"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getContests } from "../../contest-actions";
import { type ContestType } from "@/types/types";
import { unwrapActionResult } from "@/utils/error-helper";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";
import ContestCard from "@/components/contest-page-components/contest-card";
import NoData from "@/components/shared/no-data";
import {
  type FilterOption,
  useDifficultyFilter,
} from "@/hooks/use-difficulty-filter";

export default function ContestCardSection({
  contestType,
}: {
  contestType: ContestType;
}) {
  const {
    data: contestData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [contestType],
    queryFn: async () => {
      const result = await getContests(contestType);
      return unwrapActionResult(result);
    },
    staleTime: Infinity,
  });

  const [filter, setFilter] = useState<FilterOption>("ALL");

  const filteredContests = useDifficultyFilter(contestData, filter);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} message={error.message} />;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <FilterByDifficulty onFilterChange={setFilter} />
      </div>
      {filteredContests.length === 0 ? (
        <NoData
          title="No contest available"
          subtitle="Currently no contest available. Please contribute by submitting a new contest"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContests.map((contest) => (
            <Link
              key={contest.id}
              href={contest.url}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContestCard contest={contest} approveContestCard={false} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
