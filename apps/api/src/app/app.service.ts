import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getMain() {
    const data = {
      message: 'incidental-api',
    };
    return data;
  }
}
