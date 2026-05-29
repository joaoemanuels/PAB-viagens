const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCurrency(value) {
  if (typeof value !== "number" || isNaN(value)) {
    return priceFormatter.format(0);
  }

  return priceFormatter.format(value);
}
