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

type Props = {
  month: Date | undefined;
  onMonthSelect: (month: Date) => void;
};

export default function LeaderboardMonthPicker({
  month,
  onMonthSelect,
}: Props) {
  const today = new Date();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !month && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {month ? format(month, "MMM yyyy") : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker
          minDate={new Date(2025, 2)} // March 2025
          maxDate={today}
          selectedMonth={month}
          onMonthSelect={onMonthSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
