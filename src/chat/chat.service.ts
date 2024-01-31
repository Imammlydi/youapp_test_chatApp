
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { CreateChatDto } from './dto/chat.dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { UserDocument } from '../user/schemas/user.schema'; // Import UserDocument

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>, // Inject userModel
    @Inject('RABBITMQ_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const createdChat = new this.chatModel(createChatDto);
    const savedChat = await createdChat.save();

    await this.userModel.findByIdAndUpdate(
      createChatDto.sender,
      { $push: { chats: savedChat._id } },
      { new: true }
    );

    await this.userModel.findByIdAndUpdate(
      createChatDto.receiver,
      { $push: { chats: savedChat._id } },
      { new: true }
    );

    this.client.emit('chat_created', savedChat);

    return savedChat;
  }

  @EventPattern('chat_created')
  handleChatCreated(data: Chat) {
    console.log('Received chat_created event:', data);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }
}

