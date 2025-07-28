export function moneyFormatter(value: number) {
  return `${Math.ceil(value).toLocaleString()}`;
}

export function dateFormatter(value: Date) {
  const date = new Date(value);
  return Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function CapitaliseFirstLetter(value: string) {
  return value
    ?.split("")[0]
    .toLocaleUpperCase()
    .concat(String(value).split("")?.splice(1)?.join(""));
}
