import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';
import { AuthModule } from 'src/authentication/auth.module';
import { routesWithRedisMiddleware } from 'src/common/constants/getRedisCacheRouters';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { LogResponseMiddleware } from 'src/common/middlewares/logResponse.middleware';
import { RedisMiddleware } from 'src/common/middlewares/redis.middleware';
import { DatabaseModule, GlobalHttpModule, RedisModule } from 'src/providers';
import { ThrottleModule } from 'src/providers/throttler/throttler.module';
import { AppController } from './app.controller';
import { CartItemModule } from './cart-item/cart-item.module';
import { EmailModule } from './email/email.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { UploadModule } from './upload/upload.module';
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
    }),
    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     global: true,
    //     secret: configService.get<string>('JWT_SECRET'),
    //     // signOptions: {
    //     //   expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
    //     // },
    //   }),
    //   inject: [ConfigService],
    // }),
    GlobalHttpModule,
    RedisModule,
    DatabaseModule,
    ThrottleModule,
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
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogResponseMiddleware).forRoutes('*');
    // consumer.apply(ReverseProxyAuthMiddleware).forRoutes({
    //   path: 'app',
    //   method: RequestMethod.ALL,
    // });
    consumer.apply(RedisMiddleware).forRoutes(...routesWithRedisMiddleware);
  }
}
