import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({
    description: 'Provide the user name.',
    example: 'Oliver Pippin',
  })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiProperty({
    description: 'Must be a valid email.',
    example: 'facundoOrtiz@example.com',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password must contain at least one capital letter, one number, and one of these symbols: !@#$%^&*',
    example: 'Facundo.13!',
  })
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
  password: string;

  @ApiProperty({
    description:
      'Optional field. The minimum number of characters is 3 and the maximum is 80.',
    example: 'Example 738',
  })
  @IsOptional()
  @IsString()
  @Length(3, 80)
  address?: string;

  @ApiProperty({
    description: 'Provide a valid phone number.',
    example: 3755687921,
  })
  @IsOptional()
  @IsNumber()
  phone?: number;

  @ApiProperty({
    description:
      'Optional field. The minimum number of characters is 5 and the maximum is 20.',
    example: 'Exampleland',
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;

  @ApiProperty({
    description:
      'Optional field. The minimum number of characters is 5 and the maximum is 20.',
    example: 'New Example',
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;

  @ApiProperty({
    description: 'Array of roles. API will assign an "user" role for default.',
    example: ['user'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles: string[];
}
