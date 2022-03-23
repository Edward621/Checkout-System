import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PromotionsModule } from './promotions/promotions.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [ProductsModule, PromotionsModule, CheckoutModule],
})
export class AppModule {}
