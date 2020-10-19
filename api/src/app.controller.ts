import { Controller, Get, Query } from '@nestjs/common';
import * as lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async audit(@Query('url') url: string): Promise<any> {
    console.log('auditing ' + url);
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      onlyCategories: ['performance'],
      port: chrome.port,
    };
    const runnerResult = await lighthouse(url, options);

    await chrome.kill();
    return {
      url,
      performance: {
        score: runnerResult.lhr.categories.performance.score * 100,
      },
    };
  }
}
