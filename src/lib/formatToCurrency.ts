export default function formatToCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    currencySign: undefined,
  }).format(value);
}
