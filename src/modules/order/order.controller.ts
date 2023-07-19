import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderCreatePaymentDto } from './dto/OrderCreatePayment.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('getAllOrder/:key')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('show/:id')
  getOrdersByIdAuth(@Param('id') idAuth: string) {
    return this.orderService.getOrdersByIdAuth(idAuth);
  }

  @Post('create_payment_url')
  createPaymentUrl(@Body() body: OrderCreatePaymentDto) {
    return this.orderService.createPaymentUrl(body);
  }

  @Get('vnpay_return')
  vnpayReturn() {}

  @Post('add-order')
  addOrder() {}
}
