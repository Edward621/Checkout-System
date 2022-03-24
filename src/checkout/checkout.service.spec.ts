import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from './checkout.service';
import { ProductsService } from '../products/products.service';
import { PromotionsService } from '../promotions/promotions.service';
import { Promotion, DiscountType } from '../promotions/entities';
import { Product } from '../products/entities';

const mockProductService = () => ({
  findOne: jest.fn(),
});
const mockPromotionService = () => ({
  getPromotionsByIds: jest.fn(),
});

describe('CheckoutService', () => {
  let service: CheckoutService;
  let productService: ProductsService;
  let promotionsService: PromotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        {
          provide: ProductsService,
          useFactory: mockProductService,
        },
        {
          provide: PromotionsService,
          useFactory: mockPromotionService,
        },
      ],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
    productService = module.get<ProductsService>(ProductsService);
    promotionsService = module.get<PromotionsService>(PromotionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Scan items and Get Total', () => {
    beforeEach(async () => {
      const ids = [1, 2];
      const promotions: Promotion[] = [
        {
          id: 1,
          name: 'Pizza Promotions',
          description:
            'Buy 2 or more pizzas, the price for each drops to €3.99.',
          productCode: '002',
          conditions: {
            minQuantity: 2,
            minPurchase: 0,
          },
          discount: {
            type: DiscountType.FIX,
            amount: 2,
          },
          priority: 1,
        },
        {
          id: 2,
          name: 'Price off',
          description: 'If you spend over €30, you get 10% off your purchase.',
          productCode: '',
          conditions: {
            minQuantity: 0,
            minPurchase: 30,
          },
          discount: {
            type: DiscountType.PERCENT,
            amount: 10,
          },
          priority: 10,
        },
      ];
      jest
        .spyOn(promotionsService, 'getPromotionsByIds')
        .mockResolvedValueOnce(promotions);
      await service.initialize(ids);
    });
    it('should scan an item', async () => {
      const productCode = '001';
      const product: Product = {
        code: '001',
        name: 'Curry Sauce',
        price: 1.95,
      };
      jest.spyOn(productService, 'findOne').mockResolvedValueOnce(product);
      const res = await service.scan(productCode);
      expect(res).toBe(service.itemList);
      expect(res).toStrictEqual([product]);
    });
    it('should get total as 0 if there is no item in itemList', async () => {
      const res = await service.getTotal();
      expect(res).toEqual(0);
    });
    it('should get total equal to 29.65', async () => {
      service.itemList = [
        {
          code: '002',
          name: 'Pizza',
          price: 5.99,
        },
        {
          code: '001',
          name: 'Curry Sauce',
          price: 1.95,
        },
        {
          code: '003',
          name: 'Men’s T-Shirt',
          price: 25,
        },
      ];
      const res = await service.getTotal();
      expect(res).toStrictEqual('29.65');
    });
    it('should get total equal to 9.93', async () => {
      service.itemList = [
        {
          code: '002',
          name: 'Pizza',
          price: 5.99,
        },
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
      ];
      const res = await service.getTotal();
      expect(res).toStrictEqual('9.93');
    });
    it('should get total equal to 31.44', async () => {
      service.itemList = [
        {
          code: '002',
          name: 'Pizza',
          price: 5.99,
        },
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
          price: 25,
        },
      ];
      const res = await service.getTotal();
      expect(res).toStrictEqual('31.44');
    });
  });
});
