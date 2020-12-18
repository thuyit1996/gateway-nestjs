import { definedTimeGetEvent, slots } from '../config/fake-data';
import { IEvent } from '../interface/event';
import { ITimeOnDay } from '../interface/time-on-day';
import { GET_SUCCESS } from '../config/constant';

const MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000;

export const getDateInWeek = (startDate: string) => {
  const current = new Date(startDate);
  const first = current.getDate() - current.getDay() + 1; // INFO: default is sunday, increment by one this become monday
  const last = first + 5; // INFO: get saturday = monday + 5;
  const monday = new Date(current.setDate(first)).setHours(0, 0, 0); // INFO: compare  start date of monday
  const saturday = new Date(current.setDate(last)).setHours(23, 59, 59); // INFO: compare end of saturday
  return {
    monday,
    saturday,
  };
};

export const getEventOnWeek = (
  events: IEvent[],
  start: number,
  end: number,
) => {
  return events
    .filter((item) => {
      return (
        getTimeStamp(item.startTime) >= start &&
        getTimeStamp(item.endTime) <= end
      );
    })
    .map((item) => {
      return {
        ...item,
        day: new Date(item.startTime).getDate(),
      };
    });
};

export const getTimeStamp = (date: string | number) => {
  return new Date(date).getTime();
};

export const customDayForWeek = (mondayTimestamp: number) => {
  const getDateStart = new Date(mondayTimestamp).getDate();
  const datePlaceHolder = [{}, {}, {}, {}, {}, {}];
  const listDate = [];
  datePlaceHolder.forEach((item, index) => {
    listDate.push({
      date: new Date(
        new Date(mondayTimestamp).getTime() + MILLISECONDS_OF_DAY * index,
      ),
      day: getDateStart + index,
    });
  });
  const newTime = [];
  const timeGetEvent = definedTimeGetEvent.hours;
  Object.keys(timeGetEvent).forEach((key, index) => {
    const trunkStart = timeGetEvent[key].start_time.split(':'); // INFO: example after trunk ['08','00','00']
    const trunkEnd = timeGetEvent[key].end_time.split(':'); // INFO: example after trunk ['08','00','00']
    newTime.push({
      ...timeGetEvent[key],
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

export const getEventForDay = (
  customDay: ITimeOnDay[],
  eventList: IEvent[] = [],
) => {
  const finalData = [];
  if (customDay?.length) {
    customDay.forEach((item) => {
      const eventForDay = [];
      eventList.forEach((event) => {
        if (event.day === item.day) {
          if (
            getTimeStamp(event.startTime) >= item.start &&
            getTimeStamp(event.endTime) <= item.end
          ) {
            delete event.day;
            eventForDay.push(event);
          }
        }
      });
      finalData.push({
        date: new Date(item.date).toLocaleDateString(),
        start: new Date(item.start).toISOString(),
        end: new Date(item.end).toISOString(),
        slots: slots,
        events: eventForDay,
      });
    });
  }
  return finalData;
};

export const customResponse = (startDate: string, totalDate: number, data) => {
  return {
    start: new Date(startDate).toLocaleDateString(),
    length: Number(totalDate),
    days: data,
  };
};

export const getFinalResponse = (
  mondayTimestamp: number,
  startDate: string,
  totalDate: number,
  eventList: IEvent[] = [],
) => {
  const customDay = customDayForWeek(mondayTimestamp);
  const data = getEventForDay(customDay, eventList);
  return {
    message: GET_SUCCESS('event for user'),
    data: customResponse(startDate, totalDate, data),
  };
};
