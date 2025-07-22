import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { authGuard } from '../../guards/auth.guards';
import { UuidValidationPipe } from '../../pipes/uuidValidation.pipe';
import { CreateProductDto } from '../../dtos/CreateProductDto.dto';
import { UpdateProductDto } from '../../dtos/UpdateProductDto.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /*@Post('seeder') // Precarga de datos.
  async seed() {
  try {
    return await this.productsService.seedProducts();
  } catch(e) {
   throw new BadRequestException(`Error executing seeder: ${e}`)}
  }*/

  @Get() // Lista de todos los productos paginados.
  async getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page ?? '1');
    const limitNum = parseInt(limit ?? '5');
    try {
      return await this.productsService.getProductsPaginated(pageNum, limitNum);
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  @Get(':id') // Producto por ID.
  async getProductById(@Param('id', UuidValidationPipe) id: string) {
    try {
      return await this.productsService.getProductById(id);
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Post() // Crear un producto.
  async createProduct(@Body() product: CreateProductDto) {
    try {
      return await this.productsService.createProduct(product);
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Put(':id') // Actualizar un producto.
  updateProduct(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateData: UpdateProductDto,
  ) {
    try {
      return this.productsService.updateProduct(id, updateData);
    } catch (e) {
      return new BadRequestException(`Couldn't update the item. Error: ${e}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Delete(':id') // Eliminar un producto.
  async deleteProduct(@Param('id', UuidValidationPipe) id: string) {
    try {
      return await this.productsService.deleteProduct(id);
    } catch (e) {
      throw new BadRequestException(`Error ocurred: ${e}`);
    }
  }
}
