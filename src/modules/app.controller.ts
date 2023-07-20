import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('app')
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World! 123123123';
  }

  @EventPattern('hello')
  async hello(text: string) {
    console.log('👌  text:', text);
    return text;
  }
}
