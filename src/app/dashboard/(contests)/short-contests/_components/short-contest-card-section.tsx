"use client";

import Link from "next/link";
import ContestCard from "@/components/contest-page-components/contest-card";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/fetch";

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

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {shortContestData.map((contest) => (
        <Link key={contest.id} href={contest.link} className="group">
          <ContestCard contest={contest} approveContestCard={false} />
        </Link>
      ))}
    </div>
  );
}
