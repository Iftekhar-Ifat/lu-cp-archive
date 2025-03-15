import { notFound } from "next/navigation";
import { getTopicBySlug } from "@/lib/db";

type TopicPageProps = {
  params: { topic: string };
};

export default async function TopicPage({ params }: TopicPageProps) {
  // Testing
  const topic = await getTopicBySlug(params.topic);

  if (!topic) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg p-6 shadow-md">
      <h1 className="text-3xl font-bold">{topic.name}</h1>
      <p className="mt-4 text-muted-foreground">
        This page contains information about {topic.name}.
      </p>
    </div>
  );
}
