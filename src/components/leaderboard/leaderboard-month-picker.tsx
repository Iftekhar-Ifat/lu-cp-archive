"use client";

import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/monthpicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { type LeaderboardDateType } from "@/utils/schema/leaderboard";

export default function LeaderboardMonthPicker({
  leaderboardDate,
  allowedMonths,
  onMonthSelect,
}: {
  leaderboardDate: Date | undefined;
  allowedMonths: LeaderboardDateType[];
  onMonthSelect: (leaderboardDate: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !leaderboardDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {leaderboardDate ? (
            format(leaderboardDate, "MMM yyyy")
          ) : (
            <span>Pick a month</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker
          selectedMonth={leaderboardDate}
          onMonthSelect={onMonthSelect}
          allowedMonths={allowedMonths}
        />
      </PopoverContent>
    </Popover>
  );
}
