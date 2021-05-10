import { CustomHelpers } from 'joi';

export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({
      'string.min': 'password must be at least 8 characters',
    });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({
      'string.contain': 'password must contain at least 1 letter and 1 number',
    });
  }
  return value;
};
