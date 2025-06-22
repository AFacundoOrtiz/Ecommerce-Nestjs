import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import { CreateUserDto } from 'src/dtos/CreateUserDto.dto';
import { hashPassword } from 'src/helpers/hashPassword';
import { validatePassword } from 'src/helpers/validatePassword';
import { LoginUserDto } from 'src/dtos/LoginUserDto.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt-payload.interface';
import { User } from '../Users/user.entity';
import { RoleService } from '../Role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
  ) {}

  async signup(user: CreateUserDto) {
    const checkUser = await this.usersService.findByEmail(user.email);
    if (checkUser) {
      throw new BadRequestException('User already related with this email.');
    }

    const hash = await hashPassword(user.password);
    const roleNames = user.roles?.length ? user.roles : ['user'];
    const roles = await this.roleService.findByNames(roleNames);

    if (roles.length === 0) {
      throw new BadRequestException('Invalid role.');
    }

    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
      roles,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return { message: 'User created successfully.', user: userWithoutPassword };
  }

  async signin({ email, password }: LoginUserDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    await validatePassword(password, user.password);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.roles.map((r) => r.name),
    };

    const token = this.jwtService.sign(payload);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const decoded = this.jwtService.decode(token) as JwtPayload;

    const { exp, iat } = decoded;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return {
      message: 'User logged in succesfully!',
      token,
      issuedAt: new Date((iat || 0) * 1000).toISOString(),
      expiresAt: new Date((exp || 0) * 1000).toISOString(),
      user: userWithoutPassword as Omit<User, 'password'>,
    };
  }
}
