"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DifficultyBadge from "../difficulty-badge";

export type FilterOption = "EASY" | "MEDIUM" | "HARD" | "ALL";

type ItemFilterProps = {
  onFilterChange: (filter: FilterOption) => void;
};

export default function FilterByDifficulty({
  onFilterChange,
}: ItemFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("ALL");

  const handleFilterChange = (difficulty: FilterOption) => {
    setSelectedFilter(difficulty);
    onFilterChange(difficulty);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-[150px] items-center justify-start"
        >
          <Filter className="mr-2 h-4 w-4" />
          {selectedFilter === "ALL" ? (
            <span className="text-muted-foreground">Filter</span>
          ) : (
            <DifficultyBadge difficulty={selectedFilter} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuRadioGroup
          value={selectedFilter}
          onValueChange={(value) => handleFilterChange(value as FilterOption)}
        >
          <DropdownMenuRadioItem value="ALL">All</DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="EASY">
            <DifficultyBadge difficulty="EASY" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="MEDIUM">
            <DifficultyBadge difficulty="MEDIUM" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="HARD">
            <DifficultyBadge difficulty="HARD" />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
