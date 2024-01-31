
import { Controller, Post, Body, Get, Req, UseGuards} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Post('sendMessage')
  // create(@Body() createChatDto: CreateChatDto) {
  //   return this.chatService.create(createChatDto);
  // }
  
  
  @UseGuards(JwtAuthGuard) 
  @Post('sendMessage')
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  // @UseGuards(JwtAuthGuard) // Protect the endpoint with JWTAuthGuard
  // @Post()
  // create(@Body() createChatDto: CreateChatDto, @Req() req) {
  //   const senderId = req.user.sub; // Extract user ID from the JWT token
  //   createChatDto.sender = senderId; // Set sender ID in the DTO
  //   return this.chatService.create(createChatDto);
  // }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }
}

