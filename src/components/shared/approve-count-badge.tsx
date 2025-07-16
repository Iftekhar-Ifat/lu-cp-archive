"use client";

import { Badge } from "../ui/badge";

export default function ApproveCountBadge({ count }: { count?: number }) {
  if (typeof count !== "number" || count <= 0) {
    return null;
  }

  return (
    <Badge className="pointer-events-none absolute -top-2 left-full min-w-5 -translate-x-1/2 justify-center bg-green-100 px-1 text-sm text-emerald-500 dark:bg-green-500/20">
      {count > 99 ? "99+" : count}
    </Badge>
  );
}
