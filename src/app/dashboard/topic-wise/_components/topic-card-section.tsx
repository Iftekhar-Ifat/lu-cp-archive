"use client";

import Link from "next/link";
import TopicCard from "./topic-card";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import { getTopics } from "../topic-actions";
import { unwrapActionResult } from "@/utils/error-helper";
import NoData from "@/components/shared/no-data";

export default function TopicCardSection() {
  const {
    data: topics,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const result = await getTopics();
      return unwrapActionResult(result);
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} />;
  }

  return (
    <div>
      {topics.length === 0 ? (
        <NoData
          title="No topics available"
          subtitle="There are currently no topics available"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`topic-wise/${topic.slug}`}
              className="group"
            >
              <TopicCard topic={topic} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
