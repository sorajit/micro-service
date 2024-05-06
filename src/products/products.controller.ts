import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDtoDto } from './dto/update-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}

    @Get()
    findAll(@Query("productname")  productname: string){
        return this.productsService.findAll(productname)
    }
    @Get(":id")
    findOne(@Param("id",ParseIntPipe) id: number){
        return this.productsService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createProduct:CreateProductDto){
        return this.productsService.create(createProduct)
    }

    @Patch(":id")
    updata(@Param("id",ParseIntPipe) id: number, @Body(ValidationPipe) updateProduct: UpdateProductDtoDto){
        return this.productsService.update(id,updateProduct)
    }

    @Delete(":id")
    delete(@Param("id",ParseIntPipe) id:number){
        return this.productsService.delete(id)
    }

}
