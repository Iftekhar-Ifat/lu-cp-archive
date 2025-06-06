"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
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

type ResultsTableProps = {
  data: GeneratedLeaderboard[];
  adjustments: Record<string, number>;
  onAdjustmentChange: (userId: string, value: string) => void;
};

export default function GeneratedLeaderboardTable({
  data,
  adjustments,
  onAdjustmentChange,
}: ResultsTableProps) {
  const rankedUsers = useMemo(() => {
    const usersWithTotals = data.map((item) => ({
      ...item,
      adjustment: adjustments[item.user.id] ?? 0,
      total_points: item.generated_point + (adjustments[item.user.id] ?? 0),
    }));

    return usersWithTotals
      .sort((a, b) => b.total_points - a.total_points)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  }, [data, adjustments]);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Generated Points</TableHead>
            <TableHead>Adjustment</TableHead>
            <TableHead>Total Points</TableHead>
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
              <TableCell>
                <Input
                  type="number"
                  value={adjustments[item.user.id] ?? ""}
                  onChange={(e) =>
                    onAdjustmentChange(item.user.id, e.target.value)
                  }
                  className="[&::-moz-appearance]:textfield w-24 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="0"
                />
              </TableCell>
              <TableCell className="font-mono text-lg font-semibold">
                {item.total_points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
