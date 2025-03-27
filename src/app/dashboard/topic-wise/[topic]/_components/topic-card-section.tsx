"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchTopicProblem } from "@/lib/fetch";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import ProblemCard from "@/components/topic-cards/problem-card";
import { useEffect, useState } from "react";
import { type Problem } from "@/utils/types";
import { ProblemFilter } from "@/components/ProblemFilter";

export default function ProblemCardSection({ topic }: { topic: string }) {
  const {
    data: topicWiseProblemData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: [`${topic}-problems`],
    queryFn: () => fetchTopicProblem(topic),
  });

  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);

  useEffect(() => {
    if (topicWiseProblemData) {
      setFilteredProblems(topicWiseProblemData);
    }
  }, [topicWiseProblemData]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} />;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <ProblemFilter
          problems={topicWiseProblemData || []}
          onFilterChange={setFilteredProblems}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProblems.map((problem) => (
          <Link key={problem.id} href={problem.link} className="group">
            <ProblemCard problem={problem} approveContestCard={false} />
          </Link>
        ))}
      </div>
    </div>
  );
}
