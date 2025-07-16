import { CF_CACHE_LS_KEY } from "@/components/codeforces-ladder/check-problem-solved/check-solved-problems";

function transformTagStringsToObjects(
  strings: string[]
): { id: string; text: string }[] {
  return strings.map((text, index) => ({ id: String(index), text }));
}

function formatContestTypeTitle(value: string): string {
  return value
    .split("_")
    .map((word) =>
      word.toUpperCase() === "LU" // Special case for acronyms
        ? "LU"
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function hyphenToUnderscore(value: string): string {
  return value.replace(/-/g, "_");
}

function underscoreToHyphen(value: string): string {
  return value.replace(/_/g, "-");
}

function generateTitleToSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function localStorageCleanUp() {
  localStorage.removeItem(CF_CACHE_LS_KEY);
}

function parseUsername(rawUserName: string): string {
  const decoded = decodeURIComponent(rawUserName);
  return decoded.startsWith("@") ? decoded.slice(1) : decoded;
}

export {
  transformTagStringsToObjects,
  formatContestTypeTitle,
  hyphenToUnderscore,
  underscoreToHyphen,
  generateTitleToSlug,
  localStorageCleanUp,
  parseUsername,
};
