import { Injectable } from '@nestjs/common';
import * as Promotions from './rules.json';
import { Promotion } from './entities';

const promotions = <Promotion[]>Promotions;

@Injectable()
export class PromotionsService {
  async getPromotionsByIds(ids: number[]): Promise<Promotion[]> {
    if (!ids.length) {
      return this.getAllPromotions();
    } else {
      return promotions
        .filter((promo) => ids.includes(promo.id))
        .sort((a, b) => {
          return a.priority - b.priority;
        });
    }
  }

  async getAllPromotions() {
    return promotions;
  }
}
