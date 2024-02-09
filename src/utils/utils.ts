import { CustomHelpers } from "joi";
import { ValidationErrorItem, ValidationErrorItemType } from "sequelize";
import { ErrorMessage } from "./utils.interfaces";
import { TokenService } from "../modules/token/token.service";
import { sequelize } from "../config/sequelize.config";

/**
 * Validates a password value based on the following criteria:
 * - The password must be at least 8 characters long.
 * - The password must contain at least 1 letter and 1 number.
 * @param {string} value - The password value to validate.
 * @param {CustomHelpers} helpers - The helper functions provided by Joi.
 * @returns {string} - The validated password value.
 * @throws {Error} - If the password does not meet the validation criteria.
 */
export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({
      custom: "password must be at least 8 characters",
    });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({
      custom: "password must contain at least 1 letter and 1 number",
    });
  }
  return value;
};

/**
 * Retrieves error messages from a list of validation errors.
 * @param {ValidationErrorItem[]} [errors] - The list of validation errors.
 * @returns {ErrorMessage[]} - An array of error messages.
 */
export const getErrorMessages = (
  errors?: ValidationErrorItem[]
): ErrorMessage[] => {
  if (!errors) {
    sequelize.sync();
    return;
  }
  const errorMessages: ErrorMessage[] = [];

  errors.forEach((error) => {
    let errorMessage = "";
    let fieldName = "";

    switch (error.type) {
      case "notnull violation":
        fieldName = error.path || "";
        errorMessage = `${fieldName} is required`;
        break;
      case "unique violation":
        fieldName = error.path || "";
        errorMessage = `${fieldName} must be unique`;
        break;
      default:
        errorMessage = error.message || "Validation error";
        break;
    }

    errorMessages.push({ message: errorMessage, field: fieldName });
  });

  return errorMessages;
};

/**
 * Validates the authenticity of an authentication token.
 * @param {string} token - The authentication token to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the token is valid or not.
 */
export const validateAuthToken = async (token: string) => {
  const tokenService = new TokenService();
  return await tokenService.verifyToken(token);
};
