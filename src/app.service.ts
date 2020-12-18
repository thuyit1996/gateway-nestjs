import { Injectable } from '@nestjs/common';
import { ApiService } from './api/api.service';
import { getDateInWeek } from './helper/app-controller.helper';

@Injectable()
export class AppService {
  constructor(private readonly callApiService: ApiService) {}

  getDateOnWeek(startDate: string) {
    return getDateInWeek(startDate);
  }

  async getAllEvent() {
    const path = `/api/calendar/v1alpha1/calendars/-/events?pageSize=100`;
    const result = await this.callApiService.callApiGet(path);
    return result;
  }
}
