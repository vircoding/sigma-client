export const formatAmount = (amount) => {
  if (amount.toString().length >= 5) return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else return amount;
};
