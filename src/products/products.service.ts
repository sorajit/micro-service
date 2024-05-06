import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDtoDto } from './dto/update-products.dto';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
    private products = [
        { "id": 1, "name": "Laptop", "category": "Electronics", "price": 1000, "stock": 5 },
        { "id": 2, "name": "Phone", "category": "Electronics", "price": 500, "stock": 10 },
        { "id": 3, "name": "Bacon", "category": "Food", "price": 10, "stock": 100 },
        { "id": 4, "name": "Tea", "category": "Drink", "price": 1, "stock": 100 }
      ]

      findAll(productname?: string) {
        if(productname){
          const product = this.products.find((product) => product.name === productname)
          if(!product) throw new NotFoundException("Not Found product")
          return product
        }
        return this.products;
      }
    
      findOne(id: number) {
        const product = this.products.find((product) => product.id === id);
        if (!product) throw new NotFoundException('Product Not Found');
        return product;
      }
    
      create(createProductDto: CreateProductDto) {
        const productsByHightestId = [...this.products].sort((a, b) => b.id - a.id);
        const newProduct = {
          id: productsByHightestId[0].id + 1,
          ...createProductDto,
        };
        this.products.push(newProduct);
        return newProduct;
      }
    
      update(id: number, updateProductDto: UpdateProductDtoDto) {
        this.products = this.products.map((product) => {
          if (product.id === id) {
            return { ...product, ...updateProductDto };
          }
          return product;
        });
        return this.findOne(id);
      }
    
      delete(id: number) {
        const removedProduct = this.findOne(id);
        this.products = this.products.filter((user) => user.id !== id);
        return removedProduct;
      }
}
