export type ActionError = {
  error: string;
};

export function isActionError(error: unknown): error is ActionError {
  return typeof error === "object" && error !== null && "error" in error;
}
