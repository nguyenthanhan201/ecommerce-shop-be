import { Controller, Get, Req } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Request } from 'express';
import { Public } from 'src/libs/common/decorators/allow-unauthorize-request.decorator';

@Controller('app')
export class AppController {
  constructor() {}

  @Public()
  @Get()
  getHello(@Req() request: Request): string {
    // console.log('👌  request:', request.cookies.token);
    return 'Hello World! 123123123';
  }

  @EventPattern('hello')
  async hello(text: string) {
    console.log('👌  text:', text);
    return text;
  }
}
