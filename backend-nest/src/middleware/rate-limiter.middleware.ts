import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: {
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      message: 'Incercati mai tarziu!',
    },
  });

  use(req: any, res: any, next: () => void) {
    return this.limiter(req, res, next);
  }
}