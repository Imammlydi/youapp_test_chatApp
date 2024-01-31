import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      try {
        const secretKey = 'your-secret-key';
        console.log('Received Token:', token);
      console.log('Secret Key:', secretKey);
        const decoded = jwt.verify(token, secretKey);
        req['user'] = decoded;
      } catch (error) {
        console.error(error);
      }
    }

    next();
  }
}
