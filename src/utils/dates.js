import { addDays } from "date-fns";

export const dateToUnix = (date) => date.getTime();
export const START_DATE = dateToUnix(addDays(new Date(), 1));
export const END_DATE = dateToUnix(addDays(new Date(), 60));
export const isDateDisabled = (daysOff, date) =>
  daysOff.filter((dayOff) => new Date(date).getDay() === dayOff).length !== 0
    ? true
    : false;
