"use client";

import { Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { hasPermission } from "@/utils/permissions";
import { type ContestType } from "@/types/types";
import ContestSubmitModal from "./contest-submit-modal";
import { useQuery } from "@tanstack/react-query";
import { getUnapprovedContestCount } from "@/app/dashboard/(contests)/contest-actions";
import ApproveCountBadge from "../shared/approve-count-badge";
import { useStrictSession } from "@/hooks/use-strict-session";
import { underscoreToHyphen } from "@/utils/helper";

export default function ContestSubmitApproveSection({
  contestType,
}: {
  contestType: ContestType;
}) {
  const session = useStrictSession();
  const contestPath = underscoreToHyphen(contestType);

  const [isSubmitContestModalOpen, setIsSubmitContestModalOpen] =
    useState(false);

  const { data: unapprovedContestCount } = useQuery({
    queryKey: [contestType, "unapproved_count"],
    queryFn: async () => {
      const count = await getUnapprovedContestCount(contestType);
      return count;
    },
    staleTime: Infinity,
  });

  const hasApprovePermission = hasPermission(
    session.user.user_type,
    "approve-contest"
  );

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        onClick={() => setIsSubmitContestModalOpen(true)}
      >
        <Plus />
        Submit Contest
      </Button>
      {hasApprovePermission && (
        <Button variant="outline" asChild className="relative">
          <Link href={`/dashboard/approve-contests/${contestPath}`}>
            <Check />
            Approve Contest
            <ApproveCountBadge count={unapprovedContestCount} />
          </Link>
        </Button>
      )}
      <ContestSubmitModal
        isOpen={isSubmitContestModalOpen}
        setIsOpen={setIsSubmitContestModalOpen}
        contestType={contestType}
      />
    </div>
  );
}
