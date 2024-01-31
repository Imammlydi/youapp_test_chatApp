
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
// import { User } from '../../user/schemas/user.schema';

@Schema()
export class Chat extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sender: User; 

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  receiver: User; 

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

