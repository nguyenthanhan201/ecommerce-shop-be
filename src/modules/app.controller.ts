import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('app')
export class AppController {
  constructor() {}

  @EventPattern('hello')
  async hello(text: string) {
    console.log('👌  text:', text);
    return text;
  }
}
