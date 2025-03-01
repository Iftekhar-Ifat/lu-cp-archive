import { Badge } from "../ui/badge";
import { ContestDifficultyEnum } from "@/utils/types";

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: ContestDifficultyEnum;
}) {
  if (difficulty === "EASY") {
    return (
      <Badge className="text-emerald-500 bg-green-500/20 text-sm">Easy</Badge>
    );
  }
  if (difficulty === "MEDIUM") {
    return (
      <Badge className="text-sky-500 bg-cyan-500/20 text-sm">Medium</Badge>
    );
  }
  if (difficulty === "HARD") {
    return <Badge className="text-rose-500 bg-red-500/20 text-sm">Hard</Badge>;
  }
  return null;
}
