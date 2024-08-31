export function formatDateToLocal(utcDateString: string) {
  const date = new Date(utcDateString)
  const localDateString = date.toLocaleDateString('id-ID')

  return localDateString
}
