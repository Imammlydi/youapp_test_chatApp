
import { User } from "src/user/schemas/user.schema";
export class CreateChatDto {
  sender: User; 
  receiver: User; 
  message: string;
  receiverId: any;
}

