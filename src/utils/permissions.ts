import { type USER_TYPE } from "../types/types";

export type actions =
  | "approve-contest"
  | "approve-problem"
  | "approve-topic"
  | "submit-problem"
  | "submit-contest"
  | "submit-topic"
  | "mutate-problem" // edit & delete
  | "mutate-contest" // edit & delete
  | "mutate-topic"; // edit & delete

const permissions: Record<USER_TYPE, actions[]> = {
  ADMIN: [
    "approve-contest",
    "approve-problem",
    "approve-topic",
    "submit-contest",
    "submit-problem",
    "submit-topic",
    "mutate-contest",
    "mutate-problem",
    "mutate-topic",
  ],
  POWER: [
    "approve-contest",
    "approve-problem",
    "submit-contest",
    "submit-problem",
    "submit-topic",
    "mutate-contest",
    "mutate-problem",
  ],
  STANDARD: ["submit-contest", "submit-problem"],
} as const;

export function hasPermission(user_type: USER_TYPE, action: actions) {
  if (!permissions[user_type]) return false;
  return permissions[user_type].includes(action);
}
