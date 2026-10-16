export { cn } from "cn";

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
