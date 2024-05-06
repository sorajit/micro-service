import { IsEmail, IsEnum, IsString, IsNotEmpty, isNotEmpty, isNumber, IsNumber, IsPositive } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    name : string ;

    @IsEnum(["Electronics", "Food", "Drink"],{
        message: 'Valid category required'
    })
    category : "Electronics" | "Food" | "Drink";

    @IsPositive()
    price : number;

    @IsPositive()
    stock : number;
}