import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

  // async getUsers(): Promise<any> {
  //   return this.userModel.find().exec();
  // }

}
