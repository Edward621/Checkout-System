import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { PromotionsModule } from '../promotions/promotions.module';
import { ProductsModule } from '../products/products.module';

describe('CheckoutController', () => {
  let controller: CheckoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [CheckoutService],
      imports: [PromotionsModule, ProductsModule],
    }).compile();

    controller = module.get<CheckoutController>(CheckoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
