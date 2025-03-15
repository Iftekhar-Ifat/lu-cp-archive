"use server";

const createTopicWiseItemAction = async (data: {
  name: string;
  description: string;
}) => {
  console.log(data);
  // Simulate network delay
  // Also add link from the given name (eg., Linked List -> linked-list)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Contest created successfully" };
};

const updateTopicWiseItemAction = async (data: {
  id: string;
  name: string;
  description: string;
}) => {
  console.log(data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock success response
  return { success: true, message: "Contest created successfully" };
};

export { createTopicWiseItemAction, updateTopicWiseItemAction };
