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
import { Award, Medal, Trash2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  additional_points: Record<string, number>;
  onAdditionalPointsChange: (userId: string, value: string) => void;
  onDeleteRow: (userId: string) => void;
};

export default function GeneratedLeaderboardTable({
  data,
  additional_points,
  onAdditionalPointsChange,
  onDeleteRow,
}: ResultsTableProps) {
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
            <TableHead>additional_points</TableHead>
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
                  value={additional_points[item.user.id] ?? ""}
                  onChange={(e) =>
                    onAdditionalPointsChange(item.user.id, e.target.value)
                  }
                  className="[&::-moz-appearance]:textfield w-24 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder="0"
                />
              </TableCell>
              <TableCell className="font-mono text-lg font-semibold">
                {item.total_points}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteRow(item.user.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
