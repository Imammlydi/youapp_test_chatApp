import { Controller, Post, Request, UnauthorizedException, UseGuards,Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  async login(@Request() req) {
    try {
      const result = await this.authService.login(req.user);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return { message: 'Invalid email or password', statusCode: 401 };
      }
      return { message: 'Internal Server Error', statusCode: 500 };
    }
  }
}


