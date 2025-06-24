import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { authGuard } from '../../guards/auth.guards';
import { Product } from './product.entity';
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
    return await this.productsService.seedProducts();
  }*/

  @Get() // Lista de todos los productos paginados.
  async getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page ?? '1');
    const limitNum = parseInt(limit ?? '5');
    return await this.productsService.getProductsPaginated(pageNum, limitNum);
  }

  @Get(':id') // Producto por ID.
  async getProductById(@Param('id', UuidValidationPipe) id: string) {
    const product: Product | null =
      await this.productsService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Post() // Crear un producto.
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct(product);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('admin')
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
    return await this.productsService.deleteProduct(id);
  }
}
