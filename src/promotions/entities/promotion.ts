export interface Condition {
  minPurchase: number;
  minQuantity: number;
}

export enum DiscountType {
  FIX = 'FIX',
  PERCENT = 'PERCENT',
}
export interface Discount {
  type: DiscountType;
  amount: number;
}

export interface Promotion {
  id: number;
  name: string;
  description: string;
  productCode: string;
  conditions: Condition;
  discount: Discount;
  priority: number;
}
