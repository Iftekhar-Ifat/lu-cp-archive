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

export {
  capitalize,
  transformTagStringsToObjects,
  deleteContestMock,
  deleteTopicWiseCardMock,
};
