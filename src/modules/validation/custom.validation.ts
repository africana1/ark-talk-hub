import { CustomHelpers } from 'joi';

// Define a custom Joi validation function for UUIDs
export const uuid = (value: string, helpers: CustomHelpers) => {
  // Regular expression for validating UUIDs (both version 4 and generic format)
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(value)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid UUID' });
  }

  return value;
};
export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({ custom: 'password must be at least 8 characters' });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({ custom: 'password must contain at least 1 letter and 1 number' });
  }
  return value;
};
