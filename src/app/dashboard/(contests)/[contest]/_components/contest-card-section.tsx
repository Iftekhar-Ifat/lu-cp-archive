"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getContestData } from "../../contest-actions";
import { type Contest, type ContestType } from "@/types/types";
import { unwrapActionResult } from "@/utils/error-helper";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";
import ContestCard from "@/components/contest-page-components/contest-card";
import NoData from "@/components/shared/no-data";

export default function ContestCardSection({
  contest_type,
}: {
  contest_type: ContestType;
}) {
  const {
    data: intraLUContestData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [contest_type],
    queryFn: async () => {
      const result = await getContestData(contest_type);
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
          onFilterChange={(filtered) =>
            setFilteredContests(filtered as Contest[])
          }
        />
      </div>
      {filteredContests.length === 0 ? (
        <NoData
          title="No contest available"
          subtitle="There are currently no contest available"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContests.map((contest) => (
            <Link key={contest.id} href={contest.url} className="group">
              <ContestCard contest={contest} approveContestCard={false} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
