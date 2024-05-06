import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-products.dto";

export class UpdateProductDtoDto extends PartialType(CreateProductDto){}