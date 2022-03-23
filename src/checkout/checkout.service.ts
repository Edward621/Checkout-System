import { Injectable, BadRequestException } from '@nestjs/common';
import { PromotionsService } from '../promotions/promotions.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities';
import { Promotion, Condition } from '../promotions/entities';

@Injectable()
export class CheckoutService {
  private isCheckoutProcessInitialized: boolean;
  private itemList: Product[];
  private total: number;
  private promotions: Promotion[];

  constructor(
    private promotionsService: PromotionsService,
    private productsService: ProductsService,
  ) {}

  init() {
    this.isCheckoutProcessInitialized = false;
    this.itemList = [];
    this.total = 0;
    this.promotions = [];
  }

  async initialize(ids: number[]) {
    this.init();
    this.isCheckoutProcessInitialized = true;
    this.promotions = await this.promotionsService.getPromotionsByIds(ids);
    return this.promotions;
  }

  async scan(productCode: string) {
    this.checkIfInitialized();
    const product = await this.productsService.findOne(productCode);
    this.itemList.push(product);
    return this.itemList;
  }

  async getTotal() {
    this.checkIfInitialized();
    if (!this.itemList.length) return 0;
    this.total = this.itemList.map((p) => p.price).reduce((a, b) => a + b);
    this.promotions.forEach((promotion: Promotion) => {
      const products = promotion.productCode
        ? this.itemList.filter((item) => item.code === promotion.productCode)
        : this.itemList;
      if (this.checkIfConditionMeet(products, promotion.conditions)) {
        this.applyPromotion(products, promotion);
      }
    });
    return this.total.toFixed(2);
  }

  checkIfInitialized() {
    if (!this.isCheckoutProcessInitialized) {
      throw new BadRequestException('Check out is not initialized.');
    }
  }

  checkIfConditionMeet(products: Product[], conditions: Condition) {
    const purchase = products.map((p) => p.price).reduce((a, b) => a + b);
    return (
      products.length >= conditions.minQuantity &&
      purchase >= conditions.minPurchase
    );
  }

  applyPromotion(products: Product[], promotion: Promotion) {
    const amount = promotion.discount.amount;
    switch (promotion.discount.type) {
      case 'fix':
        this.total -= promotion.productCode ? products.length * amount : amount;
        break;
      case 'percent':
        const total = promotion.productCode
          ? products.map((p) => p.price).reduce((a, b) => a + b)
          : this.total;
        this.total -= (total * amount) / 100;
        break;
    }
  }
}
