"use client";

import Link from "next/link";
import ContestCard from "@/components/contest-page-components/contest-card";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/fetch";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { useEffect, useState } from "react";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";
import { type Contest } from "@/types/types";

export default function IntraLUContestCardSection() {
  const {
    data: intraLUContestData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["intra-lu-contests"],
    queryFn: async () => await fetchData(),
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
    return <Error refetch={refetch} />;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <FilterByDifficulty
          items={intraLUContestData || []}
          onFilterChange={setFilteredContests}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredContests.map((contest) => (
          <Link key={contest.id} href={contest.link} className="group">
            <ContestCard contest={contest} approveContestCard={false} />
          </Link>
        ))}
      </div>
    </div>
  );
}
