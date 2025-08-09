import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeaderboardGuide() {
  const guideItems = [
    {
      title: "Generate leaderboard",
      description:
        "Leaderboard generated based on previous week's performance and which is accumulated with previous points.",
    },
    {
      title: "Update",
      description: "The existing leaderboard with previous week's data.",
    },
    {
      title: "Publish",
      description: "Publish a new leaderboard.",
    },
    {
      title: "Use only this week's data",
      description:
        "Only use past week's data to publish or update the leaderboard.",
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertCircle size={24} />
          Leaderboard Generation Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="ml-5 space-y-3">
          {guideItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-current opacity-60" />
              <div className="space-y-1">
                <span className="text-sm font-semibold">{item.title}</span>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Alert className="mt-4">
          <AlertDescription className="text-xs">
            <strong>Note:</strong> Publishing will save the leaderboard for this
            month/semester, while updating will modify the current leaderboard.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
