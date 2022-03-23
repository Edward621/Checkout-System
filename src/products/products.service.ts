import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto';
import * as products from './products.json';

@Injectable()
export class ProductsService {
  async findOne(code: string) {
    const product = products.find((p) => p.code === code);
    if (!product) {
      throw new NotFoundException('Product not found!');
    } else {
      return product;
    }
  }

  async findAll() {
    return products;
  }

  async addProduct(product: CreateProductDto) {
    const index = products.findIndex((p) => p.code === product.code);
    if (index !== -1) {
      throw new BadRequestException('Product with same code already Exist');
    } else {
      products.push(product);
      return product;
    }
  }
}
