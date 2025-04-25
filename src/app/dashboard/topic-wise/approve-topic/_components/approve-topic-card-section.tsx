"use client";

import TopicWiseCard from "../../_components/topic-card";
import { unwrapActionResult } from "@/utils/error-helper";
import { useQuery } from "@tanstack/react-query";
import { getApproveTopics } from "../approve-topic-action";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import NoData from "@/components/shared/no-data";

export default function ApproveTopicCardSection() {
  const {
    data: approveTopicData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["approve-topics"],
    queryFn: async () => {
      const result = await getApproveTopics();
      return unwrapActionResult(result);
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} message={error.message} />;
  }

  return (
    <div>
      {approveTopicData.length === 0 ? (
        <NoData title="No topic to approve" />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {approveTopicData.map((topic) => (
            <TopicWiseCard
              key={topic.id}
              topic={topic}
              approveTopicCard={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
