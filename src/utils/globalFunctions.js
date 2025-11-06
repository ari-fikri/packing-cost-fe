export const formatCurrency = (num) => {
  if (typeof num !== 'number') {
    return num;
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}