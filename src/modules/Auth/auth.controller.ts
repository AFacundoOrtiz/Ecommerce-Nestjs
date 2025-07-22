import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../../dtos/LoginUserDto.dto';
import { CreateUserDto } from '../../dtos/CreateUserDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    try {
      return await this.authService.signup(user);
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  @Post('signin')
  async singin(@Body() body: LoginUserDto) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Required fields empty.');
    }

    try {
      return this.authService.signin({ email, password });
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  /*@Get('login')
  @UseGuards(AuthGuard('auth0'))
  login() {}

  @Get('callback')
  @UseGuards(AuthGuard('auth0'))
  callback(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }*/
}
