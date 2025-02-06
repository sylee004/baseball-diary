import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;

      if (+statusCode < 400) {
        this.logger.log(`${method} ${originalUrl} ${statusCode} ${ip}`);
      } else {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} ${ip} ${statusMessage}`,
        );
      }
    });

    next();
  }
}