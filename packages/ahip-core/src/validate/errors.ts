import type { ErrorObject } from "ajv";

export function formatValidationErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors || errors.length === 0) {
    return [];
  }

  return errors.map((error) => {
    const instancePath = error.instancePath || "/";
    return `${instancePath}: ${error.message ?? "validation error"}`;
  });
}
