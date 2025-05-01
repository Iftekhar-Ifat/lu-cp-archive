function getDifficultyColorWithBG(difficulty: number): string {
  if (difficulty < 1200)
    return "bg-gray-200 text-gray-800 hover:bg-gray-200 dark:bg-neutral-500 dark:text-neutral-100 dark:hover:bg-neutral-600";

  if (difficulty < 1400)
    return "bg-green-200 text-green-800 hover:bg-green-200 dark:bg-green-500 dark:text-green-100 dark:hover:bg-green-600";

  if (difficulty < 1600)
    return "bg-cyan-200 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-500 dark:text-cyan-100 dark:hover:bg-cyan-600";

  if (difficulty < 1900)
    return "bg-blue-200 text-blue-800 hover:bg-blue-200 dark:bg-blue-500 dark:text-blue-100 dark:hover:bg-blue-600";

  if (difficulty < 2100)
    return "bg-violet-200 text-violet-800 hover:bg-violet-200 dark:bg-violet-500 dark:text-violet-100 dark:hover:bg-violet-600";

  if (difficulty < 2400)
    return "bg-orange-200 text-orange-800 hover:bg-orange-200 dark:bg-orange-500 dark:text-orange-100 dark:hover:bg-orange-600";

  return "bg-red-200 text-red-800 hover:bg-red-200 dark:bg-red-500 dark:text-red-100 dark:hover:bg-red-600";
}

function getDifficultyColor(difficulty: number): string {
  if (difficulty < 1200) return "text-neutral-500";

  if (difficulty < 1400) return "text-green-500";

  if (difficulty < 1600) return "text-cyan-500";

  if (difficulty < 1900) return "text-blue-500";

  if (difficulty < 2100) return "text-violet-500";

  if (difficulty < 2400) return "text-orange-500";

  return "text-red-500";
}

export { getDifficultyColorWithBG, getDifficultyColor };
