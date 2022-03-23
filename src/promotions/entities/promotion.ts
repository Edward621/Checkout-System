export interface Condition {
  minPurchase: number;
  minQuantity: number;
}

export interface Discount {
  type: string;
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
