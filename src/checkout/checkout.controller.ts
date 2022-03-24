import { Controller, Get, Patch, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { ProductDto } from './dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Post('initialize')
  @ApiBody({ type: [Number] })
  async addProduct(@Body() ids: number[]) {
    return this.checkoutService.initialize(ids);
  }

  @Patch('scan')
  @ApiBody({ type: ProductDto })
  async scanItem(@Body() product: ProductDto) {
    return this.checkoutService.scan(product.code);
  }

  @Get('total')
  async getTotal() {
    return this.checkoutService.getTotal();
  }
}
