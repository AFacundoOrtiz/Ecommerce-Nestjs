/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Role } from '../Role/role.entity';
import { RoleService } from '../Role/role.service';
import { User } from '../Users/user.entity';
import { UsersService } from '../Users/users.service';
import { CreateUserDto } from 'src/dtos/CreateUserDto.dto';
import { hashPassword } from '../../helpers/hashPassword';
import { UnauthorizedException } from '@nestjs/common';
import { toNamespacedPath } from 'path';

describe('authSerice', () => {
  let authService: AuthService;
  let mockUserService: Partial<UsersService>;
  let mockRoleService: Partial<RoleService>;
  let mockJwtService: Partial<JwtService>;
  const mockUser: CreateUserDto = {
    name: 'Missy',
    email: 'missy@gmail.com',
    password: 'Missy.13!',
    phone: 3755687921,
    country: 'Exampleland',
    address: 'Example 738',
    city: 'New Example',
    roles: [],
  };

  beforeEach(async () => {
    mockUserService = {
      findByEmail: (email: string): Promise<User> =>
        Promise.resolve({
          id: 'b1ca2345-6bb7-8dc9-bdb1-0b1a1cc121e3',
          name: 'Missy',
          email,
          password: 'Missy.13!',
          phone: 3755687921,
          country: 'Exampleland',
          address: 'Example 738',
          city: 'New Example',
          orders: [],
          roles: [],
        }),
      createUser: (user: Omit<User, 'id'>): Promise<User> =>
        Promise.resolve({
          ...user,
          id: 'b1ca2345-5bb4-3dc2-bdb1-0b1a1cc121e3',
        }),
    };
    mockRoleService = {
      findByNames: (name: string[]): Promise<Role[]> =>
        Promise.resolve([
          {
            id: 'b1ca2345-6bb7-8dc9-bdb1-7b6a5cc432e1',
            name: 'user',
            users: [],
          },
        ]),
    };
    mockJwtService = {
      sign: jest.fn().mockReturnValue('MOCKED_JWT_TOKEN'),
      decode: jest.fn().mockReturnValue({
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      }),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: RoleService,
          useValue: mockRoleService,
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it(`signup() creates a new user with role "user" assigned  and returns it without password`, async () => {
    mockUserService.findByEmail = (email: string) => Promise.resolve(null);
    const user = await authService.signup(mockUser);
    expect(user).toBeDefined();
    expect(mockUser.password).not.toEqual(hashPassword(mockUser.password));
    expect(user.user.roles[0].name).toBe('user');
  });

  it(`signup() throws an error if the email is already in use`, async () => {
    try {
      await authService.signup(mockUser);
    } catch (e) {
      expect(e.message).toEqual('An user already related with this email.');
    }
  });

  it(`signin() throws an UnauthorizedException with a message: "Invalid credentials."`, async () => {
    try {
      await authService.signin({
        email: mockUser.email,
        password: 'INVALID_PASSWORD',
      });
    } catch (e) {
      expect(e).toEqual(new UnauthorizedException('Invalid credentials.'));
    }
  });

  it(`"signin() returns an object with a message: "User logged in succesfully!", a token and the User without password.`, async () => {
    const mockUserVariant = {
      ...mockUser,
      password: await hashPassword(mockUser.password),
      id: 'b1ca2345-6bb7-8dc9-bdb1-0b1a1cc121e3',
      orders: [],
      roles: [
        { id: 'b1ca2345-6bb7-8dc9-bdb1-7b6a5cc432e1', name: 'user', users: [] },
      ],
    };
    mockUserService.findByEmail = (email: string) =>
      Promise.resolve(mockUserVariant as User);
    const user = await authService.signin({
      email: mockUserVariant.email,
      password: mockUser.password,
    });
    expect(user).toBeDefined();
    expect(user).toMatchObject({
      message: 'User logged in succesfully!',
      token: 'MOCKED_JWT_TOKEN',
      issuedAt: expect.any(String),
      expiresAt: expect.any(String),
      user: expect.objectContaining({
        email: mockUserVariant.email,
        id: mockUserVariant.id,
        roles: expect.any(Array),
      }),
    });
  });
});
