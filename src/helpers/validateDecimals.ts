const countDecimals = function (value: number) {
  if (Math.floor(value) === value) return 0;
  return value.toString().split('.')[1].length || 0;
};

export const validateDecimals = (value: string) => {
  const decimalsNumber = countDecimals(Number(value));

  if (decimalsNumber > 2) {
    return 'Amount should have maximum 2 decimal numbers';
  }

  return true;
};
