import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './cache.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_SLAVE_DATABASE_NUMBER,
      ttl: parseInt(process.env.REDIS_TIME_TO_LIVE),
      max: parseInt(process.env.REDIS_MAX_ITEMS ?? '100000'),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
