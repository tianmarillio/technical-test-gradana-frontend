export function formatNumberWithCommas(number: number) {
  return new Intl.NumberFormat('id-ID').format(number)
}
