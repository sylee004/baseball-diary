import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

export const WinstonLoggerModule = (serviceName: string) => {
  return WinstonModule.forRoot({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          utilities.format.nestLike(serviceName, {
            prettyPrint: true,
            colors: true,
          }),
        ),
      }),
    ],
  });
};