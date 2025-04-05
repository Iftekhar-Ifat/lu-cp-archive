"use client";

import Link from "next/link";
import ContestCard from "@/components/contest-page-components/contest-card";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { type Contest } from "@/types/types";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";

export default function ShortContestCardSection() {
  const {
    data: shortContestData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lups-short-contests"],
    queryFn: async () => await fetchData(),
  });

  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);

  useEffect(() => {
    if (shortContestData) {
      setFilteredContests(shortContestData);
    }
  }, [shortContestData]);

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
          items={shortContestData || []}
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
