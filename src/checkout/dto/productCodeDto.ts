import { PickType } from '@nestjs/swagger';
import { CreateProductDto } from '../../products/dto';

export class ProductDto extends PickType(CreateProductDto, ['code'] as const) {}
