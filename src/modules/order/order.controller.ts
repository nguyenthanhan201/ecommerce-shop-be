import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
  vnpayReturn(@Req() req: Request, @Res() res: Response) {
    return this.orderService.vnpayReturn(req, res);
  }

  @Post('add-order')
  addOrder(@Req() req: Request, @Res() res: Response) {
    return this.orderService.addOrder(req, res);
  }
}