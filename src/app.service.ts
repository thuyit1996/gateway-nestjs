import { Injectable } from '@nestjs/common';
import { ApiService } from './api/api.service';
import { getDateInWeek } from './helper/app-controller.helper';

@Injectable()
export class AppService {
  constructor(private readonly callApiService: ApiService) {}

  getRetainerLead() {
    const path =
      '/api/assign/v1alpha1/products/car-insurance/distribution/leadtypes/retainer';
    const result = this.callApiService.callApiGet(path);
    return result;
  }

  getDateOnWeek(startDate: string) {
    return getDateInWeek(startDate);
  }

  async getAllEvent() {
    const path = `/api/calendar/v1alpha1/calendars/-/events?pageSize=100`;
    const result = await this.callApiService.callApiGet(path);
    return result;
  }
}
