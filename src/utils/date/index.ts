export function formatDate(date: string): string {
  const datecreate = new Date(date);
  const day =
    datecreate.getDate() < 10
      ? '0' + datecreate.getDate()
      : datecreate.getDate();
  const month =
    datecreate.getMonth() + 1 < 10
      ? '0' + datecreate.getMonth()
      : datecreate.getMonth();
  const year = datecreate.getFullYear();
  return `${day}/${month}/${year}`;
}
