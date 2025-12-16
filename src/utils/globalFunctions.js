export const formatCurrency = (num) => {
  if (typeof num !== 'number') {
    return num;
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const handleInputChange = (setter) => (e) => {
  const value = (e && e.target && typeof e.target.value === 'string') ? e.target.value : e;
  setter(String(value).toUpperCase());
};