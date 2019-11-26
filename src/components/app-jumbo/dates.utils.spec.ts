import { getBlackFridayDate, isItBlackFriday, isItSoon } from "./dates.utils";

const blackFridays: [number, number[]][] = [
  [2017, [10, 24]],
  [2018, [10, 23]],
  [2019, [10, 29]],
  [2020, [10, 27]],
  [2021, [10, 26]],
  [2022, [10, 25]],
  [2023, [10, 24]],
  [2024, [10, 29]]
];

const isItBlackFridayData: [Date, "Yes" | "No"][] = [
  [new Date(2018, 10, 21), "No"],
  [new Date(2018, 10, 22), "No"],
  [new Date(2018, 10, 23), "Yes"],
  [new Date(2018, 10, 24), "No"],
  [new Date(2018, 10, 25), "No"]
];

const isItSoonData: [Date, string][] = [
  [new Date(2018, 10, 21), "But soon! Only 2 days left 😱!"],
  [new Date(2018, 10, 22), "It is tomorrow, be ready 😱😱😱!"],
  [new Date(2018, 10, 23), "Enjoy 🎉"],
  [new Date(2018, 10, 24), "And you need to wait 370 more days ⏰..."],
  [new Date(2018, 10, 25), "And you need to wait 369 more days ⏰..."],
  [new Date(2019, 0, 1), "And you need to wait 332 more days ⏰..."],
  [new Date(2019, 10, 29), "Enjoy 🎉"]
];

describe("date utils", () => {
  it("should return the black friday date for each year", () => {
    blackFridays.forEach(([year, dateArguments]) => {
      expect(getBlackFridayDate(year)).toStrictEqual(
        new Date(year, ...dateArguments)
      );
    });
  });

  it("should return YES or NO depending on the date", () => {
    isItBlackFridayData.forEach(([date, text]) => {
      expect(isItBlackFriday(date)).toStrictEqual(text);
    });
  });

  it("should return a subtitle sentance", () => {
    isItSoonData.forEach(([date, text]) => {
      expect(isItSoon(date)).toStrictEqual(text);
    });
  });
});
