export const toSeconds = (time) => {
  if (!time) return 0;

  let seconds = 0;
  const [hour, min] = time.split(":");
  seconds += hour * 60 * 60;
  seconds += min * 60;
  return seconds;
};
