"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/components/user-provider";
import { Button } from "@/components/ui/button";
import TopicAddModal from "./topic-add-modal";

export default function TopicAddSection() {
  const { user } = useUser();
  const [isAddContestModalOpen, setIsAddContestModalOpen] = useState(false);
  return (
    <div className="flex space-x-2">
      {user?.userType === "ADMIN" && (
        <Button
          variant="outline"
          onClick={() => setIsAddContestModalOpen(true)}
        >
          <Plus />
          Add Topic Card
        </Button>
      )}
      <TopicAddModal
        isOpen={isAddContestModalOpen}
        setIsOpen={setIsAddContestModalOpen}
      />
    </div>
  );
}
