export const formatOffer = (offers, needs) => {
  let string;
  let suffix;

  if (needs.enable) {
    string = `${offers}x${needs.count}`;
    suffix = "propiedades";
  } else {
    string = `${offers}`;
    suffix = offers > 1 ? "propiedades" : "propiedad";
  }

  return { string, suffix };
};
