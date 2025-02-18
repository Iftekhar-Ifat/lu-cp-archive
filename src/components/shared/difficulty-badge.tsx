import { Badge } from "../ui/badge";
import { ContestDifficultyEnum } from "@/utils/types";

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: ContestDifficultyEnum;
}) {
  if (difficulty === "EASY") {
    return (
      <Badge className="text-green-500 bg-green-500/20 text-sm">Easy</Badge>
    );
  }
  if (difficulty === "MEDIUM") {
    return (
      <Badge className="text-cyan-500 bg-cyan-500/20 text-sm">Medium</Badge>
    );
  }
  if (difficulty === "HARD") {
    return <Badge className="text-red-500 bg-red-500/20 text-sm">Hard</Badge>;
  }
  return null;
}
