import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Must be a valid email.',
    example: 'superadmin@example.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'The password must contain at least one capital letter, one number, and one of these symbols: !@#$%^&*',
    example: 'Superadmin.123!',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
  password: string;
}
