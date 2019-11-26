import {
  getDay,
  addDays,
  addWeeks,
  isSameDay,
  getYear,
  differenceInCalendarDays,
  isToday
} from "date-fns";

import { screamImg, tadaImg, clockImg } from "./emojis";

export function getBlackFridayDate(year: number) {
  const startMonth = new Date(year, 10, 1);
  const startDayOfMonth = getDay(startMonth);
  const firstFriday = addDays(
    startMonth,
    1 + 4 + (startDayOfMonth > 4 ? 7 - startDayOfMonth : -startDayOfMonth)
  );
  return addWeeks(firstFriday, 3);
}

export function isItBlackFriday(date: Date): "Yes" | "No" {
  return isSameDay(date, getBlackFridayDate(getYear(date))) ? "Yes" : "No";
}

export function isItSoon(today: Date) {
  let blackFridayDate = getBlackFridayDate(getYear(today));
  if (today > blackFridayDate && !isToday(blackFridayDate)) {
    blackFridayDate = getBlackFridayDate(getYear(today) + 1);
  }
  const diffInDays = differenceInCalendarDays(blackFridayDate, today);

  if (diffInDays > 30) {
    return `And you need to wait ${diffInDays} more days ${clockImg}...`;
  } else if (diffInDays > 1) {
    return `But soon! Only ${diffInDays} days left ${screamImg}!`;
  } else if (diffInDays === 1) {
    return `It is tomorrow, be ready ${screamImg}${screamImg}${screamImg}!`;
  } else if (diffInDays < 0) {
    return `It is tomorrow, be ready ${screamImg}${screamImg}${screamImg}!`;
  } else {
    return `Enjoy ${tadaImg}`;
  }
}
