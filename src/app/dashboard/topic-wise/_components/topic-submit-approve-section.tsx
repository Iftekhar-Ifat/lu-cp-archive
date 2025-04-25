"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/components/user-provider";
import { Button } from "@/components/ui/button";
import TopicSubmitModal from "./topic-submit-modal";
import { hasPermission } from "@/utils/permissions";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function TopicSubmitApproveSection() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isSubmitTopicModalOpen, setIsSubmitTopicModalOpen] = useState(false);

  if (!user) {
    return redirect("/");
  }

  const hasSubmitTopicPermission = hasPermission(
    user.user_type,
    "submit-topic"
  );
  const hasApproveTopicPermission = hasPermission(
    user.user_type,
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
        <Button variant="outline" asChild>
          <Link href={`${pathname}/approve-topic`}>
            <Check />
            Approve Topic
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
