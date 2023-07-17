import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCreateDto } from './dto/productCreate.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getAllProducts')
  @ApiOperation({ summary: 'Search product in elastic search' })
  // @ApiQuery({
  //   name: 'search_term',
  //   required: false,
  //   description: 'Search term',
  //   type: String,
  // })
  @ApiResponse({
    status: 200,
    description: 'Search product in elastic search',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('hide')
  getAllHideProducts() {
    return this.productService.getAllHideProducts();
  }

  @Post('store')
  @ApiProperty()
  createProduct(@Body() body: ProductCreateDto) {
    return this.productService.createProduct(body);
  }

  @Put(':id')
  @ApiProperty()
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
