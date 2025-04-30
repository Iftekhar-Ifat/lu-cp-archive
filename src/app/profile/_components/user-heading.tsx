"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useStrictSession } from "@/hooks/use-strict-session";
import { type USER_TYPE } from "@/types/types";
import { User } from "lucide-react";

export default function UserHeading() {
  const session = useStrictSession();

  const getUserTypeColor = (userType: USER_TYPE) =>
    (
      ({
        ADMIN: "bg-red-500/20 text-rose-500",
        POWER: "bg-cyan-500/20 text-sky-500",
        STANDARD: "bg-green-500/20 text-emerald-500",
      }) as const
    )[userType];

  return (
    <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback>
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="font-mono text-2xl font-bold tracking-wide">
            {session.user.name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">@{session.user.user_name}</Badge>
            <Badge
              className={`pointer-events-none ${getUserTypeColor(session.user.user_type)}`}
            >
              {session.user.user_type}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
