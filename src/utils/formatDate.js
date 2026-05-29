const longDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
});

export function formatDate(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  const date = new Date(Date.UTC(year, month - 1, day));

  if (isNaN(date.getTime())) return dateString;

  const formatted = longDateFormatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
