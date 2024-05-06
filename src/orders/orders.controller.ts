import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService:OrdersService){}

    @Get()
    findAll(@Query("orderUser") orderUser?: string){
        return this.ordersService.findAll(orderUser)
    }
    @Post(":username")
    createOrder(@Param("username") username: string, @Body() productsOrder:{productname: string, quantity: number}){
        return this.ordersService.createOrder(username, productsOrder)
    }
    @Patch(":id")
    update(@Param("id",ParseIntPipe) id: number,@Body() updateOrder:{productname?: string, quantity?: number}){
        return this.ordersService.update(id, updateOrder)
    }

    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number){
        return this.ordersService.delete(id)
    }
}
