import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [UsersModule, ProductsModule],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
