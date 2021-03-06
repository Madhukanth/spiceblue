export const toSeconds = (time) => {
  if (!time) return 0;

  let seconds = 0;
  const [hour, min] = time.split(":");
  seconds += hour * 60 * 60;
  seconds += min * 60;
  return seconds;
};

export const toHHmm = (seconds) => {
  const hour = Math.floor(seconds / (60 * 60));
  const min = Math.floor(seconds % (60 * 60)) / 60;

  const h = hour < 10 ? `0${hour}` : hour;
  const m = min < 10 ? `0${min}` : min;
  return `${h}:${m}`;
};
