import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The product name must not exceed 50 characters.',
    example: 'Cat toy.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'A brief description of the product.',
    example: 'Excelent instrument for your little friend.',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product price.', example: 399.99 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Specify the quantity of the product.',
    example: 40,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'Provide product category.', example: 'pet toy' })
  @IsOptional()
  @IsString()
  category: string;
}
