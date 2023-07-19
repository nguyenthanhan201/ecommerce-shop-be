import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from '../search/search.module';
import { CartItemController } from './cart-item.controller';
import { CartItemSchema } from './cart-item.model';
import { CartItemService } from './cart-item.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CartItem', schema: CartItemSchema }]),
    SearchModule,
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
