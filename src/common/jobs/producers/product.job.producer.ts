import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Product } from 'src/modules/product/product.model';

@Injectable()
export class ProductProducer {
  constructor(@InjectQueue('product') private readonly product: Queue) {}

  async cacheProductsToRedis(products: Array<Product>) {
    await this.product.add(
      'cache-products',
      {
        products,
      },
      {
        removeOnComplete: true,
        delay: 1000,
      },
    );
  }
}
