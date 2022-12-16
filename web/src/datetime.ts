export const toISOStringNoTZ = (date: Date) =>
  // SingleStore doesn't support timezones in date formats
  // so we strip the last character (Z)
  date.toISOString().slice(0, -1);
