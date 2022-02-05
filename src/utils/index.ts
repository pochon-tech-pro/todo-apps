export const formatDateStringYMD = (dateString: string): string => {
  const date = new Date(dateString);
  const padding = (num: number) => num.toString().padStart(2, '0');
  return `${date.getFullYear()} / ${padding(date.getMonth() + 1)} / ${padding(
    date.getDate()
  )}`;
};
