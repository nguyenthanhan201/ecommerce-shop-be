import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/common/decorators/allow-unauthorize-request.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../user/user.model';
import { ProductCreateDto } from './dto/productCreate.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('getAllProducts/:key')
  @ApiOperation({ summary: 'Search product in elastic search' })
  @ApiResponse({
    status: 200,
    description: 'Search product in elastic search',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getAllProducts(@Req() request: Request) {
    return this.productService.getAllProducts(request);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('hide')
  getAllHideProducts(@GetUser() user: User) {
    // console.log(JSON.stringify(user, null, 2));
    return this.productService.getAllHideProducts();
  }

  @Public()
  @Get('slug')
  getAllHideSlugs() {
    // console.log(JSON.stringify(user, null, 2));
    return this.productService.getAllSlugs();
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

  @Public()
  @Put('most-viewed/:id')
  updateViewedByIdProduct(@Param('id') idProduct: string) {
    return this.productService.updateView(idProduct);
  }
}
