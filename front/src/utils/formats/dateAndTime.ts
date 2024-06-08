export const dateFormat = (date: string | Date): string => {
  const dateFormatted = date instanceof Date ? date : new Date(date);

  const year = dateFormatted.getUTCFullYear();
  const month = (dateFormatted.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateFormatted.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const TimeFormat = (date: string | Date) => {
  const dateFormatted = date instanceof Date ? date : new Date(date);
  const hour = dateFormatted.getUTCHours().toString().padStart(2, '0');
  const minutes = dateFormatted.getUTCMinutes().toString().padStart(2, '0');

  return `${hour}:${minutes}`;
};
