import { Badge } from "../ui/badge";

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: string;
}) {
  if (difficulty === "Easy") {
    return (
      <Badge className="text-green-500 bg-green-500/20 text-sm">Easy</Badge>
    );
  }
  if (difficulty === "Medium") {
    return (
      <Badge className="text-cyan-500 bg-cyan-500/20 text-sm">Medium</Badge>
    );
  }
  if (difficulty === "Hard") {
    return <Badge className="text-red-500 bg-red-500/20 text-sm">Hard</Badge>;
  }
}
