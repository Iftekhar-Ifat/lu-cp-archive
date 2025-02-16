import { Badge } from "../ui/badge";

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: string;
}) {
  if (difficulty === "Easy") {
    return <Badge className="text-red-500 bg-red-500/20 text-sm">Easy</Badge>;
  }
  if (difficulty === "Medium") {
    return <div>Medium</div>;
  }
  if (difficulty === "Hard") {
    return <div>Hard</div>;
  }
}
