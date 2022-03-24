import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':code')
  async findOne(@Param('code') id: string) {
    return this.productsService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  async addProduct(@Body() product: CreateProductDto) {
    return this.productsService.addProduct(product);
  }
}
