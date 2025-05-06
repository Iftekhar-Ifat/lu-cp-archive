import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Winner {
  rank: number;
  name: string;
  userId: string;
  points: number;
  image: string;
}

interface TopThreeWinnersProps {
  winners: Winner[];
}

export default function TopThreeWinners({ winners }: TopThreeWinnersProps) {
  const sortedWinners = [...winners].sort((a, b) => a.rank - b.rank);

  const firstPlace = sortedWinners.find((w) => w.rank === 1);
  const secondPlace = sortedWinners.find((w) => w.rank === 2);
  const thirdPlace = sortedWinners.find((w) => w.rank === 3);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="order-2 md:order-1">
        {secondPlace && (
          <WinnerCard winner={secondPlace} variant="second" size="md" />
        )}
      </div>

      <div className="order-1 md:order-2">
        {firstPlace && (
          <WinnerCard winner={firstPlace} variant="first" size="lg" />
        )}
      </div>

      <div className="order-3">
        {thirdPlace && (
          <WinnerCard winner={thirdPlace} variant="third" size="md" />
        )}
      </div>
    </div>
  );
}

interface WinnerCardProps {
  winner: Winner;
  variant: "first" | "second" | "third";
  size: "md" | "lg";
}

function WinnerCard({ winner, variant, size }: WinnerCardProps) {
  const isLarge = size === "lg";

  const variantMap = {
    first: {
      badge: "bg-rose-500 text-rose-900",
      text: "text-rose-500",
      glow: "0 0 20px rgba(244, 63, 94, 1)", // rose-500 glow
      avatarBorder: "border-rose-500",
    },
    second: {
      badge: "bg-amber-500 text-amber-900",
      text: "text-amber-500",
      glow: "0 0 20px rgba(245, 158, 11, 1)", // amber-500 glow
      avatarBorder: "border-amber-500",
    },
    third: {
      badge: "bg-emerald-500 text-emerald-900",
      text: "text-emerald-500",
      glow: "0 0 20px rgba(16, 185, 129, 1)", // emerald-500 glow
      avatarBorder: "border-emerald-500",
    },
  };

  const variantStyle = variantMap[variant];

  return (
    <Card
      className={`flex flex-col items-center border bg-card p-6 ${isLarge ? "transform md:-translate-y-4" : ""}`}
    >
      <CardContent className="flex w-full flex-col items-center p-0 pt-6">
        <div className="relative mb-4">
          <Badge
            className={`absolute -right-3 -top-3 flex h-8 w-8 justify-center rounded-full bg-accent text-sm font-extrabold text-primary`}
          >
            {winner.rank}
          </Badge>

          <div className="relative">
            <Avatar
              className={`${isLarge ? "h-28 w-28" : "h-24 w-24"} border-2 ${variantStyle.avatarBorder}`}
              style={{
                boxShadow: variantStyle.glow,
              }}
            >
              <AvatarImage
                src={winner.image}
                alt={winner.name}
                className="object-cover"
              />
              <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <h3 className={`font-bold ${isLarge ? "text-xl" : "text-lg"} mb-1`}>
          {winner.name}
        </h3>

        <Badge
          variant="outline"
          className="mb-3 px-3 py-1 text-xs text-muted-foreground"
        >
          {winner.userId}
        </Badge>

        <div
          className={`font-mono font-bold ${variantStyle.text} ${isLarge ? "text-3xl" : "text-2xl"}`}
        >
          {winner.points}
        </div>
      </CardContent>
    </Card>
  );
}
