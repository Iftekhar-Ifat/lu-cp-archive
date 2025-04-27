"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import TopicSubmitModal from "./topic-submit-modal";
import { hasPermission } from "@/utils/permissions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUnapprovedTopicCount } from "../topic-actions";
import ApproveCountBadge from "@/components/shared/approve-count-badge";
import { useStrictSession } from "@/hooks/use-strict-session";

export default function TopicSubmitApproveSection() {
  const session = useStrictSession();
  const pathname = usePathname();
  const [isSubmitTopicModalOpen, setIsSubmitTopicModalOpen] = useState(false);

  const { data: unapprovedTopic } = useQuery({
    queryKey: ["unapproved-topics-count"],
    queryFn: async () => {
      const count = await getUnapprovedTopicCount();
      return count;
    },
    staleTime: Infinity,
  });

  const hasSubmitTopicPermission = hasPermission(
    session.user.user_type,
    "submit-topic"
  );
  const hasApproveTopicPermission = hasPermission(
    session.user.user_type,
    "approve-topic"
  );

  return (
    <div className="flex space-x-2">
      {hasSubmitTopicPermission && (
        <Button
          variant="outline"
          onClick={() => setIsSubmitTopicModalOpen(true)}
        >
          <Plus />
          Submit Topic Card
        </Button>
      )}
      {hasApproveTopicPermission && (
        <Button variant="outline" asChild className="relative">
          <Link href={`${pathname}/approve-topic`}>
            <Check />
            Approve Topic
            <ApproveCountBadge count={unapprovedTopic} />
          </Link>
        </Button>
      )}
      <TopicSubmitModal
        isOpen={isSubmitTopicModalOpen}
        setIsOpen={setIsSubmitTopicModalOpen}
      />
    </div>
  );
}
