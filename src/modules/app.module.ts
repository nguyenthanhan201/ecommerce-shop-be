import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { routers } from 'src/constants/getRedisCacheRouters';
import {
  DatabaseModule,
  GlobalHttpModule,
  RedisModule,
} from 'src/libs/common/architecture';
import { AuthGuard } from 'src/libs/common/guards/auth.guard';
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
import { UserModule } from './user/user.module';
require('dotenv').config();

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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: {
        //   expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        // },
      }),
      inject: [ConfigService],
    }),
    GlobalHttpModule,
    RedisModule,
    DatabaseModule,
    // SearchModule,
    ProductModule,
    ScrapperModule,
    UserModule,
    AuthModule,
    CartItemModule,
    RatingModule,
    OrderModule,
    EmailModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogResponseMiddleware).forRoutes('*');
    consumer.apply(RedisMiddleware).forRoutes(...routers);
  }
}
