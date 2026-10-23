import "server-only";

export function requireString(
  data: Record<string, unknown>,
  field: string,
  source: string,
) {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${source}: o campo "${field}" deve ser uma string.`);
  }
  return value;
}

export function optionalString(data: Record<string, unknown>, field: string) {
  const value = data[field];
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

export function requireDateString(
  data: Record<string, unknown>,
  field: string,
  source: string,
) {
  const value = data[field];
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  return requireString(data, field, source);
}

export function optionalDateString(data: Record<string, unknown>, field: string) {
  const value = data[field];
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  return optionalString(data, field);
}

export function assertUnique(
  values: { value: string; source: string }[],
  label: string,
) {
  const sources = new Map<string, string>();
  for (const item of values) {
    const previous = sources.get(item.value);
    if (previous) {
      throw new Error(
        `${item.source}: ${label} duplicado "${item.value}"; já usado em ${previous}.`,
      );
    }
    sources.set(item.value, item.source);
  }
}

export function stringArray(
  data: Record<string, unknown>,
  field: string,
  source: string,
) {
  const value = data[field];
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`${source}: o campo "${field}" deve ser uma lista de strings.`);
  }
  return value;
}

export function requireBoolean(
  data: Record<string, unknown>,
  field: string,
  source: string,
) {
  const value = data[field];
  if (typeof value !== "boolean") {
    throw new Error(`${source}: o campo "${field}" deve ser booleano.`);
  }
  return value;
}
