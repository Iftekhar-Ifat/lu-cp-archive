import { useMemo } from "react";

export type FilterOption = "EASY" | "MEDIUM" | "HARD" | "ALL";

export function useDifficultyFilter<T extends { difficulty: string }>(
  items: T[] | undefined,
  filter: FilterOption
) {
  const filteredItems = useMemo(() => {
    const difficultyOrder: FilterOption[] = ["EASY", "MEDIUM", "HARD"];

    if (!items) return [];

    if (filter === "ALL") {
      return items
        .filter((item) =>
          difficultyOrder.includes(item.difficulty as FilterOption)
        )
        .sort(
          (a, b) =>
            difficultyOrder.indexOf(a.difficulty as FilterOption) -
            difficultyOrder.indexOf(b.difficulty as FilterOption)
        );
    }

    return items.filter((item) => item.difficulty === filter);
  }, [items, filter]);

  return filteredItems;
}
