import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCreateDto } from './dto/productCreate.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getAllProducts')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('hide')
  getAllHideProducts() {
    return this.productService.getAllHideProducts();
  }

  @Post('store')
  createProduct(@Body() body: ProductCreateDto) {
    return this.productService.createProduct(body);
  }

  @Put(':id')
  updateProductByIdProduct(
    @Body() body: ProductCreateDto,
    @Param('id') id: string,
  ) {
    return this.productService.updateProductByIdProduct(body, id);
  }

  @Put('hide/:id')
  hideProductByIdProduct(@Param('id') id: string) {
    return this.productService.hideProductByIdProduct(id);
  }

  @Put('unhide/:id')
  unhideProductByIdProduct(@Param('id') id: string) {
    return this.productService.unhideProductByIdProduct(id);
  }

  @Delete()
  deleteProductByIdProduct(@Param('id') id: string) {
    return this.productService.unhideProductByIdProduct(id);
  }

  @Get('most-viewed')
  mostViewed() {
    return this.productService.mostViewed();
  }

  @Get('most-viewed/:id')
  updateViewedByIdProduct(@Param('id') id: string) {
    return this.productService.updateView(id);
  }
}
