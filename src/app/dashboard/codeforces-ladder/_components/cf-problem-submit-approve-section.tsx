"use client";

import ProblemSubmitModal from "@/components/topic-cards/problem-submit-modal";
import { Button } from "@/components/ui/button";
import { hasPermission } from "@/utils/permissions";
import { useQuery } from "@tanstack/react-query";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ApproveCountBadge from "@/components/shared/approve-count-badge";
import { useStrictSession } from "@/hooks/use-strict-session";
import CFProblemSubmitModal from "@/components/codeforces-ladder/cf-problem-submit-modal";

export default function CFProblemSubmitApproveSection({
  difficultyLevel,
}: {
  difficultyLevel: number;
}) {
  const session = useStrictSession();
  const pathname = usePathname();
  const [isAddProblemModalOpen, setIsAddProblemModalOpen] = useState(false);
  /*  
  const { data: unapprovedProblems } = useQuery({
    queryKey: [difficultyLevel, "unapproved_count"],
    queryFn: async () => {
      const count = await getUnapprovedProblemCount(difficultyLevel);
      return count;
    },
    staleTime: Infinity,
  });
 */
  const hasApprovePermission = hasPermission("ADMIN", "approve-cf-problem");

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
            {/* <ApproveCountBadge count={unapprovedProblems} /> */}
          </Link>
        </Button>
      )}
      <CFProblemSubmitModal
        isOpen={isAddProblemModalOpen}
        setIsOpen={setIsAddProblemModalOpen}
        difficultyLevel={difficultyLevel}
        revalidateKey={difficultyLevel.toString()}
      />
    </div>
  );
}
