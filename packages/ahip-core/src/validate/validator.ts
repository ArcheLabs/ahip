import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import type { ValidateFunction } from "ajv";

import schema from "../schema/ahip-v0.2.schema.json";
import { formatValidationErrors } from "./errors.js";
import type { AHIPItem } from "../types/index.js";

export interface ValidationResult {
  valid: boolean;
  value?: AHIPItem;
  errors: string[];
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: false
});

addFormats(ajv);

const validator = ajv.compile(schema) as ValidateFunction<AHIPItem>;

export function getAHIPValidator(): ValidateFunction<AHIPItem> {
  return validator;
}

export function validateAHIPItem(input: unknown): ValidationResult {
  const valid = validator(input);

  if (valid) {
    return {
      valid: true,
      value: structuredClone(input as AHIPItem),
      errors: []
    };
  }

  return {
    valid: false,
    errors: formatValidationErrors(validator.errors)
  };
}

export function assertValidAHIPItem(input: unknown): AHIPItem {
  const result = validateAHIPItem(input);

  if (!result.valid || !result.value) {
    throw new Error(`Invalid AHIP item:\n${result.errors.join("\n")}`);
  }

  return result.value;
}
