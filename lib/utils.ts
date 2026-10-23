export { cn } from "cn";

const longDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatLongDate(date: string): string {
  return longDateFormatter.format(new Date(date));
}

export function formatExperiencePeriod(
  period: [string, string?],
  current?: boolean,
  customLabel?: string,
): string {
  if (customLabel) return customLabel;
  const [start, end] = period;
  if (end) return `${start} — ${end}`;
  if (current) return `${start} — Atual`;
  return start;
}
