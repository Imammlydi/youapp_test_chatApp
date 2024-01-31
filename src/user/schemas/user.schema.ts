
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema} from 'mongoose';
import { Chat } from 'src/chat/schemas/chat.schema';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true ,unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  zodiac: string;

  @Prop({ default: null })
  horoscope: string;

  @Prop({ default: null })
  birthdate: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Chat' }] })
  chats: Chat[];  
}


export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
