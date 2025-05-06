"use client";

import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/monthpicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { unwrapActionResult } from "@/utils/error-helper";
import { getLeaderboardDates } from "@/app/dashboard/leaderboard/leaderboard-actions";
import Loading from "../shared/loading";
import Error from "../shared/error";

type Props = {
  month: Date | undefined;
  onMonthSelect: (month: Date) => void;
};

export default function LeaderboardMonthPicker({
  month,
  onMonthSelect,
}: Props) {
  const {
    data: leaderboardDates,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leaderboard-dates"],
    queryFn: async () => {
      const result = await getLeaderboardDates();
      const unwrappedResult = unwrapActionResult(result);
      if (unwrappedResult) {
        const latestMonth = unwrappedResult[0];
        onMonthSelect(new Date(latestMonth.year, latestMonth.month - 1));
      }
      return unwrappedResult;
    },
    staleTime: Infinity,
  });

  if (isError || !leaderboardDates) {
    <Error message={error?.message} refetch={refetch} />;
  }

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
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CalendarIcon className="mr-2 h-4 w-4" />
          )}
          {month ? format(month, "MMM yyyy") : <span>Loading...</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker
          selectedMonth={month}
          onMonthSelect={onMonthSelect}
          allowedMonths={leaderboardDates}
        />
      </PopoverContent>
    </Popover>
  );
}
