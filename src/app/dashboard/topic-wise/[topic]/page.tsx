import { notFound } from "next/navigation";
import ProblemCardSection from "./_components/problem-card-section";
import { Separator } from "@/components/ui/separator";
import { ChartColumnIncreasing, Terminal } from "lucide-react";
import ProblemProgressSection from "./_components/topic-progress-section";
import { getTopicsBySlug } from "./problem-actions";
import { isActionError } from "@/utils/error-helper";
import ProblemSubmitApproveSection from "./_components/problem-submit-approve-section";

type TopicPageProps = {
  params: { topic: string };
};

export default async function TopicPage({ params }: TopicPageProps) {
  const topic = await getTopicsBySlug(params.topic);

  if (isActionError(topic)) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            {topic.data.title}
          </span>
        </div>
        <ProblemSubmitApproveSection
          topicId={topic.data.id}
          topicSlug={topic.data.slug}
        />
      </div>
      <Separator />
      <div className="mb-8 mt-4">
        <div className="mb-4 flex gap-2 text-center font-mono text-xl font-bold tracking-wide md:text-left">
          <ChartColumnIncreasing />
          Progress
        </div>
        <ProblemProgressSection topicSlug={topic.data.slug} />
      </div>
      <Separator />
      <div className="my-4">
        <div className="mb-4 flex gap-2 text-center font-mono text-xl font-bold tracking-wide md:text-left">
          <Terminal />
          Problems
        </div>
        <ProblemCardSection topicSlug={topic.data.slug} />
      </div>
    </div>
  );
}
