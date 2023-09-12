import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { routers } from 'src/constants/getRedisCacheRouters';
import {
  DatabaseModule,
  GlobalHttpModule,
  RedisModule,
} from 'src/libs/common/architecture';
import { LogResponseMiddleware } from 'src/middlewares/logResponse.middleware';
import { RedisMiddleware } from 'src/middlewares/redis.middleware';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { EmailModule } from './email/email.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // MONGODB_URI: Joi.string().required(),
        // PORT: Joi.number().required(),
      }),
      envFilePath: '.env',
    }),
    GlobalHttpModule,
    RedisModule,
    DatabaseModule,
    SearchModule,
    ProductModule,
    ScrapperModule,
    UserModule,
    AuthModule,
    CartItemModule,
    RatingModule,
    OrderModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogResponseMiddleware).forRoutes('*');
    consumer.apply(RedisMiddleware).forRoutes(...routers);
  }
}
