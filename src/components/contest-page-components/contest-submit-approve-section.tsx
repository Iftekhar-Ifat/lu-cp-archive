"use client";

import { Plus, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "../user-provider";
import { redirect, usePathname } from "next/navigation";
import { hasPermission } from "@/utils/permissions";
import { type ContestType } from "@/types/types";
import ContestSubmitModal from "./contest-submit-modal";
import { useQuery } from "@tanstack/react-query";
import { getUnapprovedContestCount } from "@/app/dashboard/(contests)/contest-actions";
import ApproveCountBadge from "../shared/approve-count-badge";

export default function ContestSubmitApproveSection({
  contestType,
}: {
  contestType: ContestType;
}) {
  const { user } = useUser();
  const pathname = usePathname().split("/").pop();
  const [isSubmitContestModalOpen, setIsSubmitContestModalOpen] =
    useState(false);

  const { data: unapprovedContests } = useQuery({
    queryKey: ["unapproved-contests", contestType],
    queryFn: async () => {
      const count = await getUnapprovedContestCount(contestType);
      return count;
    },
  });

  if (!user) {
    return redirect("/");
  }

  const hasApprovePermission = hasPermission(user.user_type, "approve-contest");

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
          <Link href={`/dashboard/approve-contests/${pathname}`}>
            <Check />
            Approve Contest
            <ApproveCountBadge count={unapprovedContests} />
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
