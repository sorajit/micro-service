import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

  @Get()
  findAll(@Query("username") username: string) {
    return this.userService.findAll(username);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto){
    return this.userService.create(createUserDto)
  }
  
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) updatedUserDto: UpdateUserDto){
    return this.userService.update(id,updatedUserDto)
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id: number){
    return this.userService.delete(id)
  }
}
