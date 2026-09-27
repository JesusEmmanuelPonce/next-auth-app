type DatabaseError = {
  code: string;
};

export type AppError = {
  error: true;
  message: string;
};

const DB_ERROR_MESSAGES: Record<string, string> = {
  "23505": "The resource already exists",
};

const isDatabaseError = (error: unknown): error is DatabaseError =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  typeof error.code === "string";

export const parseDatabaseError = (error: unknown): AppError => {
  const cause =
    typeof error === "object" && error !== null && "cause" in error
      ? error.cause
      : null;

  const message = isDatabaseError(cause)
    ? (DB_ERROR_MESSAGES[cause.code] ?? "A database error occurred")
    : "An unexpected error occurred";

  return {
    error: true,
    message,
  };
};
