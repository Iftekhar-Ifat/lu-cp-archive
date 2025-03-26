import { notFound } from "next/navigation";
import { getTopicBySlug } from "@/lib/db";
import TopicProblemAddApproveSection from "./_components/topic-problem-add-approve-section";
import ProblemProgress from "./_components/topic-wise-progress-bar";
import { ExpandableWrapper } from "@/components/shared/expandable-wrapper";
import ProblemCardSection from "./_components/topic-card-section";
import { Separator } from "@/components/ui/separator";
import { ChartColumnIncreasing, Terminal } from "lucide-react";

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
        <ExpandableWrapper maxHeight={300}>
          <ProblemProgress
            stats={[
              {
                difficulty: "EASY",
                skipped: 2,
                inProgress: 3,
                done: 5,
                total: 15,
              },
              {
                difficulty: "MEDIUM",
                skipped: 1,
                inProgress: 2,
                done: 3,
                total: 10,
              },
              {
                difficulty: "HARD",
                skipped: 0,
                inProgress: 1,
                done: 1,
                total: 5,
              },
            ]}
          />
        </ExpandableWrapper>
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
