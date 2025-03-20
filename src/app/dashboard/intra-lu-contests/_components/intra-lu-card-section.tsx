"use client";

import Link from "next/link";
import ContestCard from "@/components/contest-page-components/contest-card";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/fetch";
import { type Contest } from "@/utils/types";
import { Button } from "@/components/ui/button";

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

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex items-center">
        <div className="mr-2">Error fetching data</div>
        <Button variant="secondary" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {intraLUContestData.map((contest: Contest) => (
        <Link key={contest.id} href={contest.link} className="group">
          <ContestCard contest={contest} approveContestCard={false} />
        </Link>
      ))}
    </div>
  );
}
