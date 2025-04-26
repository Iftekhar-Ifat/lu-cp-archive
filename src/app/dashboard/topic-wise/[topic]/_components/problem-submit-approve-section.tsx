"use client";

import ProblemSubmitModal from "@/components/topic-cards/problem-submit-modal";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/user-provider";
import { hasPermission } from "@/utils/permissions";
import { useQuery } from "@tanstack/react-query";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { getUnapprovedProblemCount } from "../problem-actions";
import ApproveCountBadge from "@/components/shared/approve-count-badge";

export default function ProblemSubmitApproveSection({
  topicId,
}: {
  topicId: string;
}) {
  const { user } = useUser();
  const pathname = usePathname();
  const [isAddProblemModalOpen, setIsAddProblemModalOpen] = useState(false);

  const { data: unapprovedProblems } = useQuery({
    queryKey: ["unapproved-contests"],
    queryFn: async () => {
      const count = await getUnapprovedProblemCount(topicId);
      return count;
    },
  });

  if (!user) {
    redirect("/");
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-problem");

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => setIsAddProblemModalOpen(true)}>
        <Plus />
        Submit Problem
      </Button>
      {hasApprovePermission && (
        <Button variant="outline" asChild className="relative">
          <Link href={`${pathname}/approve-problem`}>
            <Check />
            Approve Problem
            <ApproveCountBadge count={unapprovedProblems} />
          </Link>
        </Button>
      )}
      <ProblemSubmitModal
        isOpen={isAddProblemModalOpen}
        setIsOpen={setIsAddProblemModalOpen}
        topicId={topicId}
      />
    </div>
  );
}
