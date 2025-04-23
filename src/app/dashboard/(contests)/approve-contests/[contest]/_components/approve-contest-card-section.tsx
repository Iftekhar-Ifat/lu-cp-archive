"use client";

import Link from "next/link";
import { type ContestType } from "@prisma/client";
import ContestCard from "@/components/contest-page-components/contest-card";
import NoData from "@/components/shared/no-data";
import { unwrapActionResult } from "@/utils/error-helper";
import Error from "@/components/shared/error";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/loading";
import { useState } from "react";
import {
  type FilterOption,
  useDifficultyFilter,
} from "@/hooks/use-difficulty-filter";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";
import { getApproveContests } from "../approve-contest-action";

export default function ApproveContestCardSection({
  contestType,
}: {
  contestType: ContestType;
}) {
  const {
    data: approveContestData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [contestType],
    queryFn: async () => {
      const result = await getApproveContests(contestType);
      return unwrapActionResult(result);
    },
  });

  const [filter, setFilter] = useState<FilterOption>("ALL");

  const filteredContests = useDifficultyFilter(approveContestData, filter);

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
        <NoData title="No contest to approve" />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContests.map((contest) => (
            <Link
              key={contest.id}
              href={contest.url}
              className="group"
              target="_blank"
            >
              <ContestCard contest={contest} approveContestCard={true} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
