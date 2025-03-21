function capitalize(value: string) {
  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

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

function formatLastPathSegment(pathname: string): string {
  const segments = pathname.split("/").filter((segment) => segment);

  if (segments.length === 0) {
    return "";
  }

  const lastSegment = segments[segments.length - 1];

  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export {
  capitalize,
  transformTagStringsToObjects,
  deleteContestMock,
  deleteTopicWiseCardMock,
  formatLastPathSegment,
};
