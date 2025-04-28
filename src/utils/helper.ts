function transformTagStringsToObjects(
  strings: string[]
): { id: string; text: string }[] {
  return strings.map((text, index) => ({ id: String(index), text }));
}

// Mock database delete function
async function deleteContestMock(data: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data);
      resolve(true);
    }, 2000); // Simulate 2 second delay
  });
}

async function deleteTopicWiseCardMock(data: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data);
      resolve(true);
    }, 2000); // Simulate 2 second delay
  });
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

export {
  transformTagStringsToObjects,
  deleteContestMock,
  deleteTopicWiseCardMock,
  formatContestTypeTitle,
  hyphenToUnderscore,
  underscoreToHyphen,
  generateTitleToSlug,
};
