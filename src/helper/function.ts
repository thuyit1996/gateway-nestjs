import { definedTimeGetEvent } from '../config/fake-data';

export const getDateInWeek = (startDate: string) => {
  const current = new Date(startDate);
  const first = current.getDate() - current.getDay() + 1; // INFO: get monday
  const last = first + 5; // INFO: get saturday;
  const monday = new Date(current.setDate(first)).setHours(0, 0, 0); // INFO: compare  start date of monday
  const saturday = new Date(current.setDate(last)).setHours(23, 59, 59); // INFO: compare end of saturday
  return {
    monday,
    saturday,
  };
};

export const getTime = (date: string | number) => {
  return new Date(date).getTime();
};

export const customDayForWeek = (mondayTimestamp: number) => {
  const getDateStart = new Date(mondayTimestamp).getDate();
  const listDate = [];
  for (let i = 0; i <= 5; i++) {
    listDate.push({
      date: new Date(
        new Date(mondayTimestamp).getTime() + 24 * 60 * 60 * 1000 * i,
      ),
      day: getDateStart + i,
    });
  }
  const newTime = [];
  Object.keys(definedTimeGetEvent).forEach((key, index) => {
    const trunkStart = definedTimeGetEvent[key].start_time.split(':');
    const trunkEnd = definedTimeGetEvent[key].end_time.split(':');
    newTime.push({
      ...definedTimeGetEvent[key],
      ...listDate[index],
      start: new Date(listDate[index].date).setHours(
        trunkStart[0],
        trunkStart[1],
        trunkStart[2],
      ),
      end: new Date(listDate[index].date).setHours(
        trunkEnd[0],
        trunkEnd[1],
        trunkEnd[2],
      ),
    });
  });
  return newTime;
};

export const customResponse = (startDate: string, data: any) => {
  return {
    start: new Date(startDate).toLocaleDateString('en-CA'),
    length: 7,
    days: data,
  };
};
