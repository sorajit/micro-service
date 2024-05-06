import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly usersService:UsersService,
        private readonly productsService:ProductsService,
    ){}

    private orders = [
        {
            "id": 1,
            "orderUser": "Leanne Graham",
            "orderDetail": {
                "productname": "Phone",
                "quantity": 10
            },
            "createAt": "2024-05-06T08:32:30.060Z"
        }
    ];

    findAll(orderUser: string){
        if(orderUser){
            const order = this.orders.filter((order) => order.orderUser === orderUser);
            if(!order) throw new NotFoundException("Not Found order")
            return order
        }
        return this.orders
    }

    findOne(id: number) {
        const order = this.orders.find((order) => order.id === id);
        if (!order) throw new NotFoundException('Order Not Found');
        return order
      }

    createOrder(username: string, productsOrder:{productname:string, quantity: number}){
        const user = this.usersService.findAll(username);    
        const product = this.productsService.findAll(productsOrder.productname);
        const userObj = JSON.parse(JSON.stringify(user)) // ไม่สามารถเข้าถึง user.name ได้โดยตรง ต้องแปรเป็น string ก่อน แล้วแปรกลับเป็น obj
        const orderByHighestId =  [...this.orders].sort((a,b) => b.id - a.id);
        let nextId = 1;
        if(orderByHighestId.length !== 0 ) {
             nextId = orderByHighestId[0].id+1;
        }
        const order = {
            id: nextId,
            orderUser: userObj.name,
            orderDetail: productsOrder,
            createAt: new Date(Date.now()).toISOString()
        }
        this.orders.push(order);
        return order
    }

    update(id: number, updateOrder:{productname?: string, quantity?: number}){
        if(updateOrder.productname){
            const product = this.productsService.findAll(updateOrder.productname);
        }
        
        this.orders = this.orders.map((order) => {
            if(order.id === id){
                order.orderDetail = {...order.orderDetail,...updateOrder}
                return order
            }
            return order
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedOrder = this.findOne(id);
        this.orders = this.orders.filter((order) => order.id !== id);
        return removedOrder
    }
}
