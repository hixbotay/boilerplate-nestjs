import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/users.entity';
import { RedisCacheService } from 'src/cache/cache.service';
import { RedisCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    RedisCacheModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
