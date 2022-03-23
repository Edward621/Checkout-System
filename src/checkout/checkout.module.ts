import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { ProductsModule } from '../products/products.module';
import { PromotionsModule } from '../promotions/promotions.module';

@Module({
  providers: [CheckoutService],
  controllers: [CheckoutController],
  imports: [PromotionsModule, ProductsModule],
})
export class CheckoutModule {}
