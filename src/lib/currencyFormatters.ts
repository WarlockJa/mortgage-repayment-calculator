export default function convertToCurrency(
  value: number,
  isShowCurrencySign?: boolean,
) {
  return isShowCurrencySign
    ? new Intl.NumberFormat("en-GB", {
        currency: "GBP",
        maximumFractionDigits: 2,
      }).format(value)
    : new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(
        value,
      );
}
