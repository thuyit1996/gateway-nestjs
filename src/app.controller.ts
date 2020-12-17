import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import { customDayForWeek, customResponse, getTime } from './helper/function';
import { slots } from './config/fake-data';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-date-in-week')
  getDateInWeek(
    @Query('start-date') startDate,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(startDate);
    const date = this.appService.getDateOnWeek(startDate);
    return res.status(200).json({
      msg: 'Get date successfully!',
      date: date,
    });
  }

  @Get('/get-event')
  async getEvent(
    @Query('start-date') startDate,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { monday, saturday } = this.appService.getDateOnWeek(startDate);
    try {
      const response = await this.appService.getAllEvent();
      const { events } = response.data;
      if (events?.length) {
        const eventList = events
          .filter((item) => {
            return (
              getTime(item.startTime) >= monday &&
              getTime(item.endTime) <= saturday
            );
          })
          .map((item) => {
            return {
              ...item,
              day: new Date(item.startTime).getDate(),
            };
          });
        const customDay = customDayForWeek(monday);
        const finalData = [];
        if (customDay?.length) {
          customDay.forEach((item) => {
            const eventForDay = [];
            eventList.forEach((event) => {
              if (event.day === item.day) {
                if (
                  getTime(event.startTime) >= item.start &&
                  getTime(event.endTime) <= item.end
                ) {
                  eventForDay.push(event);
                }
              }
              delete event.day;
            });
            finalData.push({
              date: new Date(item.date).toLocaleDateString('en-CA'),
              start: new Date(item.start).toISOString(),
              end: new Date(item.end).toISOString(),
              slots: slots,
              events: eventForDay,
            });
          });
        }
        const customDataResponse = customResponse(startDate, finalData);
        return res.status(200).json({
          msg: 'Get date successfully!',
          data: customDataResponse,
        });
      }
    } catch (error) {
      return res.status(500).json({
        msg: 'Something error, try again latter',
      });
    }
  }
}
