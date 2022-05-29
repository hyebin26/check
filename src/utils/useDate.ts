const useDate = (time: string) => {
  const day = new Date(time);
  const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
  const month = day.getMonth() + 1;
  const date = day.getDate() === 1 ? 31 : day.getDate() - 1;
  const week = WEEKDAY[day.getDay()];
  const hours = day.getUTCHours();
  const minute = day.getMinutes();
  return `${month}/${date}(${week}) ${hours}:${minute} ~ ${
    hours + 2
  }:${minute}`;
};

export default useDate;
