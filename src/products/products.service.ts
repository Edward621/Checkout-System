import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

const PRODUCTS = [
  {
    code: '001',
    name: 'Curry Sauce',
    price: 1.95,
  },
  {
    code: '002',
    name: 'Pizza',
    price: 5.99,
  },
  {
    code: '003',
    name: 'Men’s T-Shirt',
    price: 25.0,
  },
];

@Injectable()
export class ProductsService {
  async findOne(code) {
    const product = PRODUCTS.find((p) => p.code === code);
    if (!product) {
      throw new NotFoundException();
    } else {
      return product;
    }
  }

  async findAll() {
    return PRODUCTS;
  }

  async addProduct(product) {
    const index = PRODUCTS.findIndex((p) => p.code === product.code);
    if (index !== -1) {
      throw new BadRequestException('Product with same code already Exist');
    } else {
      PRODUCTS.push(product);
      return product;
    }
  }
}
