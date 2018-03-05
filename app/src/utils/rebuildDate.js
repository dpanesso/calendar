// @flow

export const rebuildDate = (old: Date, update: Date) => {
  const year = update.getFullYear();
  const month = update.getMonth();
  const day = update.getDate();
  const hour = old.getHours();
  const minutes = old.getMinutes();
  return new Date(year, month, day, hour, minutes);
};

export const rebuildTime = (old: Date, update: Date) => {
  const year = old.getFullYear();
  const month = old.getMonth();
  const day = old.getDate();
  const hour = update.getHours();
  const minutes = update.getMinutes();
  return new Date(year, month, day, hour, minutes);
};
