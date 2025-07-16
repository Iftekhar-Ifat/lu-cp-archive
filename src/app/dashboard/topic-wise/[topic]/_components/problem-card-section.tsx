"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import ProblemCard from "@/components/topic-cards/problem-card";
import { useState } from "react";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";
import { unwrapActionResult } from "@/utils/error-helper";
import { getProblemsByTopic } from "../problem-actions";
import {
  type FilterOption,
  useDifficultyFilter,
} from "@/hooks/use-difficulty-filter";
import NoData from "@/components/shared/no-data";

export default function ProblemCardSection({
  topicSlug,
}: {
  topicSlug: string;
}) {
  const {
    data: problemData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [topicSlug],
    queryFn: async () => {
      const result = await getProblemsByTopic(topicSlug);
      return unwrapActionResult(result);
    },
    staleTime: Infinity,
  });

  const [filter, setFilter] = useState<FilterOption>("ALL");

  const filteredProblems = useDifficultyFilter(problemData, filter);

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
      {filteredProblems.length === 0 ? (
        <NoData
          title="No problem available"
          subtitle="Currently no problem available. Please contribute by submitting a new problem"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProblems.map((problem) => (
            <Link
              key={problem.id}
              href={problem.url}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProblemCard problem={problem} approveContestCard={false} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
