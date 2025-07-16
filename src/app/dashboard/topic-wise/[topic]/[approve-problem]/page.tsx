import { notFound } from "next/navigation";
import ApproveProblemCardSection from "./_components/approve-problems-card-section";
import { hasPermission } from "@/utils/permissions";
import { auth } from "@/lib/auth";
import { getTopicsBySlug } from "../problem-actions";
import { isActionError } from "@/utils/error-helper";

type ApproveProblemPageProps = {
  params: { topic: string };
};

export default async function ApproveProblem({
  params,
}: ApproveProblemPageProps) {
  const topic = await getTopicsBySlug(params.topic);

  if (isActionError(topic)) {
    notFound();
  }

  const session = await auth();

  if (!session || !hasPermission(session.user.user_type, "approve-problem")) {
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
      <ApproveProblemCardSection problemTopic={params.topic} />
    </div>
  );
}
