const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date: Date): string => {
  return `${Days[date.getDay()]}, ${date.getDate()} ${Months[date.getMonth()]}`;
};
