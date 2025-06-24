import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { authGuard } from '../../guards/auth.guards';
import { UuidValidationPipe } from '../../pipes/uuidValidation.pipe';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../../dtos/UpdateUserDto.dto';
import { UpdateRoleDto } from '../../dtos/UpdateRoleDto.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('admin')
  @Get() // Retorna todos los usuarios paginados.
  async getUsers(
    @Query('page') page?: string | null,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page ?? '1');
    const limitNum = parseInt(limit ?? '5');

    return await this.userService.getUsersPaginated(pageNum, limitNum);
  }

  /*@Post() //Crea un nuevo usuario.
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }*/

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Get(':id') // Retona un usuario por su ID.
  async getUserById(@Param('id', UuidValidationPipe) id: string) {
    return await this.userService.getUserById(id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Put(':id') // Modifica los datos el usuario.
  async updateUser(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateData: UpdateUserDto,
  ) {
    if (!updateData) {
      throw new BadRequestException('New information must be provided.');
    }
    try {
      return await this.userService.updateUser(id, updateData);
    } catch (e) {
      throw new BadRequestException(`Information couldn't be upload. ${e}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('admin')
  @Put('roles/:id') // Modifica los roles de un usuario pasado por ID.
  async updateRoles(
    @Param('id', UuidValidationPipe) id: string,
    @Body() role: UpdateRoleDto,
  ) {
    try {
      return this.userService.updateRoles(id, role);
    } catch (e) {
      throw new BadRequestException(`Roles couldn't be changed. Error: ${e}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Delete(':id') // Elimina al usuario por ID.
  async deleteUser(@Param('id', UuidValidationPipe) id: string) {
    return await this.userService.deleteUser(id);
  }
}
