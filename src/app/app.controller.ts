import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  async app() {
    return 'Hello World';
  }
}
