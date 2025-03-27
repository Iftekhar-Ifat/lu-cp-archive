import { notFound } from "next/navigation";
import { getTopicBySlug } from "@/lib/db";
import TopicProblemAddApproveSection from "./_components/topic-problem-add-approve-section";
import ProblemCardSection from "./_components/topic-card-section";
import { Separator } from "@/components/ui/separator";
import { ChartColumnIncreasing, Terminal } from "lucide-react";
import TopicProblemProgressSection from "./_components/topic-problem-progress-section";

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
            {topic.name}
          </span>
        </div>
        <TopicProblemAddApproveSection />
      </div>
      <Separator />
      <div className="mb-8 mt-4">
        <div className="mb-4 flex text-center font-mono text-xl font-bold tracking-wide md:text-left">
          <ChartColumnIncreasing className="mr-2" />
          Progress
        </div>
        <TopicProblemProgressSection topic={topic.name} />
      </div>
      <Separator />
      <div className="my-4">
        <div className="mb-4 flex text-center font-mono text-xl font-bold tracking-wide md:text-left">
          <Terminal className="mr-2" />
          Problems
        </div>
        <ProblemCardSection topic={topic.name} />
      </div>
    </div>
  );
}
