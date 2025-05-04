"use client";

import Link from "next/link";
import ProblemCard from "@/components/topic-cards/problem-card";
import { useQuery } from "@tanstack/react-query";
import { unwrapActionResult } from "@/utils/error-helper";
import { useState } from "react";
import {
  type FilterOption,
  useDifficultyFilter,
} from "@/hooks/use-difficulty-filter";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import FilterByDifficulty from "@/components/shared/filtering/filter-by-difficulty";
import NoData from "@/components/shared/no-data";
import { getUnapprovedProblemsByTopic } from "../approve-problem-actions";

export default function ApproveProblemCardSection({
  problemTopic,
}: {
  problemTopic: string;
}) {
  const {
    data: unapprovedProblemData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [problemTopic, "unapproved"],
    queryFn: async () => {
      const result = await getUnapprovedProblemsByTopic(problemTopic);
      return unwrapActionResult(result);
    },
  });

  const [filter, setFilter] = useState<FilterOption>("ALL");

  const filteredProblems = useDifficultyFilter(unapprovedProblemData, filter);

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
        <NoData title="No problem to approve" />
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
              <ProblemCard problem={problem} approveContestCard={true} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
