import { getTopicBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ApproveProblemCardSection from "./_components/approve-problems-card-section";

type ApproveProblemPageProps = {
  params: { topic: string };
};

export default async function ApproveProblem({
  params,
}: ApproveProblemPageProps) {
  const topic = await getTopicBySlug(params.topic);

  if (!topic) {
    notFound();
  }
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Approve
            <code className="relative mx-2 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">
              {params.topic}
            </code>
            Problems
          </span>
        </div>
      </div>

      <Suspense fallback={"Loading ..."}>
        <ApproveProblemCardSection problemType={params.topic} />
      </Suspense>
    </div>
  );
}
