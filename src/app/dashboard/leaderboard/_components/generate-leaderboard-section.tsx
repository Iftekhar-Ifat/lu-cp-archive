"use client";

import { Button } from "@/components/ui/button";
import { useStrictSession } from "@/hooks/use-strict-session";
import { hasPermission } from "@/utils/permissions";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function GenerateLeaderboardSection() {
  const session = useStrictSession();

  const hasPermissionToGenerate = hasPermission(
    session.user.user_type,
    "generate-leaderboard"
  );

  if (!hasPermissionToGenerate) {
    return null;
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" asChild>
        <Link href="/dashboard/leaderboard/generate-leaderboard">
          <Sparkles />
          Generate Leaderboard
        </Link>
      </Button>
    </div>
  );
}
