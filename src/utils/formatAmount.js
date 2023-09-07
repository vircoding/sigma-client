export const formatAmount = (amount, withSuffix = false) => {
  const string = amount.toString();
  const digitsNumber = string.length;

  if (digitsNumber >= 7 && withSuffix) {
    const prefix = string.slice(0, -6);
    const suffix = prefix === "1" ? "millón" : "millones";
    return `${prefix} ${suffix}`;
  }

  if (digitsNumber >= 5) {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return string;
};
