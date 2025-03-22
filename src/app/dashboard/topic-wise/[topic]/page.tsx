import { notFound } from "next/navigation";
import { getTopicBySlug } from "@/lib/db";
import TopicProblemAddApproveSection from "./_components/topic-problem-add-approve-section";
import ProblemProgress from "./_components/topic-wise-progress-bar";
import { ExpandableWrapper } from "@/components/shared/expandable-wrapper";

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
  );
}
