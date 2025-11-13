import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './errors/custom-exception/custom-exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/custom-error')
  throwCustomError() {
    throw new CustomException();
  }
}
