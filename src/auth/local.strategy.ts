import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// import { Strategy } from "passport-jwt";
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', 
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    // console.log('Validating email:', email,'---',password);
    if (!user) {
      throw new UnauthorizedException(    `Invalid email or password. Please check your credentials. ${user}`);
    }
    
    return user;
  }
  
}
