export type ActionError = {
  error: string;
};

export function isActionError(error: unknown): error is ActionError {
  return typeof error === "object" && error !== null && "error" in error;
}

export type ActionSuccess<T> = {
  data: T;
};

export type ActionResult<T> = ActionSuccess<T> | ActionError;

export function unwrapActionResult<T>(result: ActionResult<T>): T {
  if (isActionError(result)) {
    throw new Error(result.error);
  }
  return result.data;
}
