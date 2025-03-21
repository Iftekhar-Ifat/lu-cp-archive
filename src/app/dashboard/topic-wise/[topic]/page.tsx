import { notFound } from "next/navigation";
import { getTopicBySlug } from "@/lib/db";
import TopicProblemAddApproveSection from "./_components/topic-problem-add-approve-section";

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
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            {topic.name} Problems
          </span>
        </div>
        <TopicProblemAddApproveSection />
      </div>
      {/*  */}
    </div>
  );
}
