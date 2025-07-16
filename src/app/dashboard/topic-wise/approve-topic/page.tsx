import { hasPermission } from "@/utils/permissions";
import { notFound } from "next/navigation";
import ApproveTopicCardSection from "./_components/approve-topic-card-section";
import { auth } from "@/lib/auth";

export default async function ApproveTopic() {
  const session = await auth();

  if (!session || !hasPermission(session.user.user_type, "approve-topic")) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Approve Topic
          </span>
        </div>
      </div>
      <ApproveTopicCardSection />
    </div>
  );
}
