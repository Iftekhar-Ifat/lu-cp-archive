"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/components/user-provider";
import { Button } from "@/components/ui/button";
import TopicAddModal from "./topic-add-modal";
import { hasPermission } from "@/utils/permissions";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function TopicAddApproveSection() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);

  if (!user) {
    return redirect("/");
  }

  const hasAddTopicPermission = hasPermission(user.userType, "add-topic");
  const hasApproveTopicPermission = hasPermission(
    user.userType,
    "approve-topic"
  );

  return (
    <div className="flex space-x-2">
      {hasAddTopicPermission && (
        <Button variant="outline" onClick={() => setIsAddTopicModalOpen(true)}>
          <Plus />
          Add Topic Card
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
      <TopicAddModal
        isOpen={isAddTopicModalOpen}
        setIsOpen={setIsAddTopicModalOpen}
      />
    </div>
  );
}
