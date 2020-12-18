import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { constant } from '../config/constant';
@Injectable()
export class ApiService {
  getUrl(path: string) {
    return constant.API_ENDPOINT + path;
  }
  async callApiGet(path: string): Promise<any> {
    const url = this.getUrl(path);
    const result = await axios({
      url,
      headers: constant.REQUEST_HEADER,
      auth: constant.AUTH_ACCOUNT,
    });
    return result;
  }
  async callApiPost(path: string, body?: any): Promise<any> {
    const url = this.getUrl(path);
    const result = await axios({
      url,
      data: body,
      headers: constant.REQUEST_HEADER,
      auth: constant.AUTH_ACCOUNT,
    });
    return result;
  }
}
