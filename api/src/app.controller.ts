import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  audit(@Query('url') url: string): string {
    console.log('auditing ' + url);
    return url;
  }
}
