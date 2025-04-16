"use client";

import Link from "next/link";
import ContestCard from "@/components/contest-page-components/contest-card";
import { useQuery } from "@tanstack/react-query";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { useEffect, useState } from "react";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";
import { getContestData } from "../../_actions/contest-actions";
import { unwrapActionResult } from "@/utils/error-helper";
import { type Contest } from "@/types/types";

export default function IntraLUContestCardSection() {
  const {
    data: intraLUContestData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["intra-lu-contests"],
    queryFn: async () => {
      const result = await getContestData("intra_lu_contests");
      return unwrapActionResult(result);
    },
  });

  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);

  useEffect(() => {
    if (intraLUContestData) {
      setFilteredContests(intraLUContestData);
    }
  }, [intraLUContestData]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} message={error.message} />;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <FilterByDifficulty
          items={intraLUContestData || []}
          // for now
          onFilterChange={(filtered) =>
            setFilteredContests(filtered as Contest[])
          }
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredContests.map((contest) => (
          <Link key={contest.id} href={contest.url} className="group">
            <ContestCard contest={contest} approveContestCard={false} />
          </Link>
        ))}
      </div>
    </div>
  );
}
