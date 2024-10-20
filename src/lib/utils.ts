export const middleEllipsis = (
  str?: string,
  len: number = 4,
  symbol = "..."
) => {
  if (!str) return "";
  return str.length > len
    ? `${str.slice(0, len)}${symbol}${str.slice(str.length - len)}`
    : str;
};

export const turnRandomNumberFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
