import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User,UserDocument} from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(
      private readonly jwtService: JwtService,
      @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}
  
    async validateUser(email: string, password: string): Promise<any> {
      console.log('Validating email:', email,'---',password);
      const user = await this.userModel.findOne({ email });
      
      const compares = await bcrypt.compare(password, user.password);
      console.log('Validating email:', user,'---',compares);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user.toJSON();
        return result;
      }
      // if (!user || !(await bcrypt.compare(password, user.password))) {
      //   throw new UnauthorizedException('Invalid email or password');
      // }
      
  
      return null;
    }
    async validateUserById(userId: string): Promise<User | null> {
      return this.userModel.findById(userId).exec();
    }
    async login(user: any) {
      const payload = { sub: user._id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }