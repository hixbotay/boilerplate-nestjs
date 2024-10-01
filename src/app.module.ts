import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { RedisCacheModule } from './cache/cache.module';
import * as winston from 'winston';
import options from './log.config';
import configService from './ormconfig.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    RedisCacheModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(),
      ],
      exitOnError: false,
    }),
  ],
})
export class AppModule {}
