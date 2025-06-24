import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'Array of roles. API will assign an "user" role for default.',
    example: ['user'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  roles: string[];
}
