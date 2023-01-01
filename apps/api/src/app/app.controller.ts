import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GetMainRes } from './interface/getMain.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getMain(): Promise<GetMainRes> {
    const response = await this.appService.getMain();
    return response;
  }
}
