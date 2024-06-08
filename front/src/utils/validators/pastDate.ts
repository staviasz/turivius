export function pastDate(date: Date | string) {
  const dateParse = new Date(date);

  const dateUTC = new Date(
    Date.UTC(
      dateParse.getUTCFullYear(),
      dateParse.getUTCMonth(),
      dateParse.getUTCDate(),
      dateParse.getUTCHours(),
      dateParse.getUTCMinutes(),
      dateParse.getUTCSeconds(),
    ),
  );
  const today = Date.now();

  if (+dateUTC < today) {
    return false;
  }
  return true;
}
