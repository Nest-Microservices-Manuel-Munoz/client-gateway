import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { NATS_SERVICE } from '../config';
import { firstValueFrom } from 'rxjs';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.natClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto) {
    // Logic to get all products
    return this.natClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    // Logic to get a product by ID
    try {
      const product = await firstValueFrom<Record<string, any>>(
        this.natClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await firstValueFrom<Record<string, any>>(
        this.natClient.send(
          { cmd: 'update_product' },
          {
            id,
            ...updateProductDto,
          },
        ),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom<Record<string, any>>(
        this.natClient.send({ cmd: 'delete_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
