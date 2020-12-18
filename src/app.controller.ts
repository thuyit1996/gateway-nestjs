import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import {
  getEventOnWeek,
  getFinalResponse,
} from './helper/app-controller.helper';
import { GET_SUCCESS, MESSAGE_SERVER, STATUS_SERVER } from './config/constant';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-date-in-week')
  getDateInWeek(
    @Query('start-date') startDate,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const date = this.appService.getDateOnWeek(startDate);
    return res.status(STATUS_SERVER.SUCCESS).json({
      message: GET_SUCCESS('date'),
      data: date,
    });
  }

  @Get('/get-event')
  async getEvent(
    @Query('start-date') startDate,
    @Query('total-date') totalDate,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { monday, saturday } = this.appService.getDateOnWeek(startDate);
    try {
      const response = await this.appService.getAllEvent();
      const { events } = response.data;
      if (events?.length) {
        const eventList = getEventOnWeek(events, monday, saturday);
        const finalResponse = getFinalResponse(
          monday,
          startDate,
          totalDate,
          eventList,
        );
        return res.status(STATUS_SERVER.SUCCESS).json(finalResponse);
      } else {
        const finalResponse = getFinalResponse(monday, startDate, totalDate);
        return res.status(STATUS_SERVER.SUCCESS).json(finalResponse);
      }
    } catch (error) {
      return res.status(STATUS_SERVER.INTERNAL).json({
        message: MESSAGE_SERVER.SERVER_ERROR,
      });
    }
  }
}
