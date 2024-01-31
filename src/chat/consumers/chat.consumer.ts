import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Chat } from '../schemas/chat.schema';

@Injectable()
export class ChatConsumer {
  @MessagePattern('chat_created')
  async handleChatCreated(chat: Chat): Promise<void> {
    console.log('Received chat:', chat);
  }
}
