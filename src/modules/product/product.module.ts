import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from '../search/search.module';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    SearchModule,
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
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
