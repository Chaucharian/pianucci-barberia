import { addDays, getDate, getMonth } from "date-fns";

export const isHolidays = date =>
  ((getMonth(date) === 11 && getDate(date) === 25) || (getMonth(date) === 0 && (getDate(date) === 1 || getDate(date) === 2 || getDate(date) === 3 || getDate(date) === 4)));
export const dateToUnix = (date) => date.getTime();
export const START_DATE = dateToUnix(addDays(new Date(), 1));
export const END_DATE = dateToUnix(addDays(new Date(), 60));
export const isDateDisabled = (daysOff, date) =>
  daysOff.filter((dayOff) => new Date(date).getDay() === dayOff).length !== 0
    ? true
    : false;
