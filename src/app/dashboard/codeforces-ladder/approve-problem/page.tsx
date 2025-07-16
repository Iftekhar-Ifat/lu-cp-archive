import { auth } from "@/lib/auth";
import { hasPermission } from "@/utils/permissions";
import { notFound } from "next/navigation";
import ApproveCFProblemSection from "./_components/approve-cf-problem-section";

export default async function CFApproveProblem() {
  const session = await auth();

  if (
    !session ||
    !hasPermission(session.user.user_type, "approve-cf-problem")
  ) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Approve Codeforces Problems
          </span>
        </div>
      </div>
      <ApproveCFProblemSection />
    </div>
  );
}
