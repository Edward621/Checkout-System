import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  code: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  price: number;
}
