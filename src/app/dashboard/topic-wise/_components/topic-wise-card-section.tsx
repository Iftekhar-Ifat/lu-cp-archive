"use client";

import Link from "next/link";
import TopicWiseCard from "./topic-wise-card";
import { fetchTopics } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";

export default function TopicWiseCardSection() {
  const {
    data: topics,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => await fetchTopics(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error refetch={refetch} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic, index) => (
        <Link key={index} href={`topic-wise/${topic.link}`} className="group">
          <TopicWiseCard topic={topic} />
        </Link>
      ))}
    </div>
  );
}
