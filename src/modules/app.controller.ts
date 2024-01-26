import { Controller, Get, Req } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Request } from 'express';
import { Public } from 'src/common/decorators/allow-unauthorize-request.decorator';

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
  // async hello(text: string) {
  async hello(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log('👌  data:', data);
    // console.log('👌  text:', text);
    // return text;
    console.log('👌  data:', context.getMessage().content.toString());
    // context.getChannelRef().ack(context.getMessage());
    return data;
  }
}
