import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '').trim()
      : '';
    console.log('token = ', token);

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded = ', decoded);

        if (decoded) {
          next();
        }
      } catch (e) {
        console.log(`AuthorizeMiddleware error, error = ${e.message}`);

        res.status(401).json({
          message: 'Unauthorized',
        });
      }
    }
  }
}
