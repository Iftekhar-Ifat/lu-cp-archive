"use client";

import { ExpandableWrapper } from "@/components/shared/expandable-wrapper";
import ProblemProgress from "./topic-wise-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { fetchProblemStats } from "@/lib/fetch";
import Loading from "../loading";
import Error from "@/components/shared/error";

export default function TopicProblemProgressSection({
  topic,
}: {
  topic: string;
}) {
  const {
    data: progressData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: [`${topic}-progress`],
    queryFn: async () => await fetchProblemStats(),
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
