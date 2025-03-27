import { Badge } from "../ui/badge";
import { type ContestDifficultyType } from "@/utils/types";

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: ContestDifficultyType;
}) {
  if (difficulty === "EASY") {
    return (
      <Badge className="pointer-events-none bg-green-500/20 text-sm text-emerald-500">
        Easy
      </Badge>
    );
  }
  if (difficulty === "MEDIUM") {
    return (
      <Badge className="pointer-events-none bg-cyan-500/20 text-sm text-sky-500">
        Medium
      </Badge>
    );
  }
  if (difficulty === "HARD") {
    return (
      <Badge className="pointer-events-none bg-red-500/20 text-sm text-rose-500">
        Hard
      </Badge>
    );
  }
  return null;
}
