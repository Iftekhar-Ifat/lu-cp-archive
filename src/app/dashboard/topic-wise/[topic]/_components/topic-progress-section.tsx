"use client";

import { ExpandableWrapper } from "@/components/shared/expandable-wrapper";
import ProblemProgress from "./topic-progress";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import Error from "@/components/shared/error";
import { getProblemProgressStats } from "../problem-actions";
import { unwrapActionResult } from "@/utils/error-helper";
// import { type ProblemDifficulty } from "@/types/types";

export default function TopicProgressSection({
  topicSlug,
}: {
  topicSlug: string;
}) {
  const {
    data: progressData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: [topicSlug, "progress"],
    queryFn: async () => {
      const result = await getProblemProgressStats(topicSlug);
      return unwrapActionResult(result);
      // When working with postgres
      /* const rawProgressData = unwrapActionResult(result);
      return rawProgressData.map((rawData) => ({
        difficulty: rawData.difficulty as ProblemDifficulty,
        skipped: Number(rawData.skipped),
        inProgress: Number(rawData.inProgress),
        done: Number(rawData.done),
        total: Number(rawData.total),
      })); */
    },
    staleTime: Infinity,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} />;
  }

  return (
    <ExpandableWrapper maxHeight={300}>
      <ProblemProgress stats={progressData} />
    </ExpandableWrapper>
  );
}
