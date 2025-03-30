import { type USER_TYPE } from "./types";

export type actions =
  | "approve-contest"
  | "approve-problem"
  | "approve-topic"
  | "add-problem"
  | "add-contest"
  | "add-topic"
  | "mutate-problem" // edit & delete
  | "mutate-contest" // edit & delete
  | "mutate-topic"; // edit & delete

const permissions: Record<USER_TYPE, actions[]> = {
  ADMIN: [
    "approve-contest",
    "approve-problem",
    "approve-topic",
    "add-contest",
    "add-problem",
    "add-topic",
    "mutate-contest",
    "mutate-problem",
    "mutate-topic",
  ],
  POWER: [
    "approve-contest",
    "approve-problem",
    "add-contest",
    "add-problem",
    "add-topic",
    "mutate-contest",
    "mutate-problem",
  ],
  STANDARD: ["add-contest", "add-problem"],
} as const;

export function hasPermission(userType: USER_TYPE, action: actions) {
  if (!permissions[userType]) return false;
  return permissions[userType].includes(action);
}
