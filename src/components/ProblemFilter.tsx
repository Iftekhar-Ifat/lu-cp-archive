"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

import { type Problem } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DifficultyBadge from "./shared/difficulty-badge";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

type FilterOption = "EASY" | "MEDIUM" | "HARD" | "ALL";

interface ProblemFilterProps {
  problems: Problem[];
  onFilterChange: (filteredProblems: Problem[]) => void;
}

export const ProblemFilter: React.FC<ProblemFilterProps> = ({
  problems,
  onFilterChange,
}) => {
  const [filterOption, setFilterOption] = useState<FilterOption | null>(null);

  const handleFilterChange = (option: string) => {
    const typedOption = option as FilterOption;
    setFilterOption(typedOption);
    applyFilter(typedOption);
  };

  const applyFilter = (option: FilterOption) => {
    if (option === "ALL") {
      onFilterChange(problems); // Reset to show all problems
    } else {
      const filteredProblems = problems.filter((p) => p.difficulty === option);
      onFilterChange(filteredProblems);
    }
  };

  return (
    <Select
      onValueChange={handleFilterChange}
      value={filterOption || undefined}
    >
      <SelectTrigger className="flex w-[150px]">
        <SelectValue
          placeholder={
            <div className="flex items-center text-primary">
              <Filter className="mr-2 h-4 w-4" />
              <div>Filter</div>
            </div>
          }
        >
          {filterOption && (
            <div className="flex items-center text-primary">
              <Filter className="mr-2 h-4 w-4" />
              {filterOption === "ALL" ? (
                <span>All</span>
              ) : (
                <DifficultyBadge difficulty={filterOption} />
              )}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="EASY">
          <DifficultyBadge difficulty="EASY" />
        </SelectItem>
        <SelectItem value="MEDIUM">
          <DifficultyBadge difficulty="MEDIUM" />
        </SelectItem>
        <SelectItem value="HARD">
          <DifficultyBadge difficulty="HARD" />
        </SelectItem>
        {filterOption && filterOption !== "ALL" && (
          <>
            <DropdownMenuSeparator />
            <SelectItem value="ALL" className="font-bold">
              Reset Filter
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
};
