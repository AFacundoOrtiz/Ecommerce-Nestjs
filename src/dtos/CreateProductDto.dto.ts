import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The product name must not exceed 50 characters.',
    example: 'Cat toy.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'A brief description of the product.',
    example: 'Excelent instrument for your little friend.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product price.', example: 399.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Specify the quantity of the product.',
    example: 40,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'Provide product category.', example: 'pet toy' })
  @IsNotEmpty()
  @IsString()
  category: string;
}
