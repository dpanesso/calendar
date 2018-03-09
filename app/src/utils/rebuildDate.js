// @flow

export const rebuildDate = (old: Date, update: Date) => {
  const localDate = new Date(old);
  const year = update.getFullYear();
  const month = update.getMonth();
  const day = update.getDate();
  const hour = localDate.getHours();
  const minutes = localDate.getMinutes();
  return new Date(year, month, day, hour, minutes);
};

export const rebuildTime = (old: Date, update: Date) => {
  const localDate = new Date(old);
  const year = localDate.getFullYear();
  const month = localDate.getMonth();
  const day = localDate.getDate();
  const hour = update.getHours();
  const minutes = update.getMinutes();
  return new Date(year, month, day, hour, minutes);
};
