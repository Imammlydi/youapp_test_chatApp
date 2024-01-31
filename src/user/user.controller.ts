
import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard) 
  @Get('getProfile/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put('updateProfile/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }

  // @Get('/chats/:id')
  // async findById(@Param('id') userId: string) {
  //   const user = await this.userService.findUserWithChats(userId);
  //   return user;
  // }

  @UseGuards(JwtAuthGuard) 
  @Get('viewMessages/:id') 
  async findUserWithChats(@Param('id') id: string) {
    const user = await this.userService.findUserWithChats(id);
    return user;
  }
  
}
