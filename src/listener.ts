import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://hchhvobc:ibuunLrTdkwzs0XMfBQRcAdUIYTJQ3nl@gerbil.rmq.cloudamqp.com/hchhvobc',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.listen().then(() => console.log('Microservice is listening'));
}
bootstrap();
