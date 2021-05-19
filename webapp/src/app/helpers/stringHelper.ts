export const removeNonNumericForDecimal = (str: string | number) => {
  return String(str).replace(/[^0-9.]/g, '');
};

export const removeNonNumeric = (str: string | number) => {
  return String(str).replace(/[^0-9]/g, '');
};
