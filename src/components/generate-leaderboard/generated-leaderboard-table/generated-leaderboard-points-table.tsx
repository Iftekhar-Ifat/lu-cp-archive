"use client";

import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { type GeneratedLeaderboard } from "@/utils/schema/generated-leaderboard";
import { Award, Medal, Trophy } from "lucide-react";

function RankColumn({ rank }: { rank: number }) {
  switch (rank) {
    case 1:
      return (
        <div className="flex gap-2 font-mono font-medium">
          {rank}
          <Trophy className="h-5 w-5 text-yellow-500" />
        </div>
      );
    case 2:
      return (
        <div className="flex gap-2 font-mono font-medium">
          {rank}
          <Medal className="h-5 w-5 text-gray-400" />
        </div>
      );
    case 3:
      return (
        <div className="flex gap-2 font-mono font-medium">
          {rank}
          <Award className="h-5 w-5 text-amber-600" />
        </div>
      );
    default:
      return <div className="flex gap-2 font-mono font-medium">{rank}</div>;
  }
}

type PointsTableProps = {
  data: GeneratedLeaderboard[];
};

export default function GeneratedLeaderboardPointsTable({
  data,
}: PointsTableProps) {
  const rankedUsers = useMemo(() => {
    return [...data].sort((a, b) => a.rank - b.rank);
  }, [data]);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Generated Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankedUsers.map((item) => (
            <TableRow
              key={item.user.id}
              className={item.rank <= 3 ? "bg-muted/30" : ""}
            >
              <TableCell>
                <RankColumn rank={item.rank} />
              </TableCell>
              <TableCell>{item.user.name}</TableCell>
              <TableCell>
                <Link href={`/profile/@${item.user.user_name}`}>
                  <Badge
                    variant="secondary"
                    className="w-fit max-w-full truncate px-2 text-xs hover:scale-[1.02]"
                  >
                    @{item.user.user_name}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell className="font-mono font-medium">
                {item.generated_point}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
