import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import Redis from 'ioredis';

@Injectable()
export class RedisThrottlerStorage implements ThrottlerStorage, OnModuleDestroy {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

    async increment(
        key: string,
        ttl: number,
        limit: number,
        blockDuration: number,
        throttlerName: string,
    ): Promise<{
        totalHits: number;
        timeToExpire: number;
        isBlocked: boolean;
        timeToBlockExpire: number;
    }> {
        const redisKey = `throttle:${throttlerName}:${key}`;
        const multi = this.redis.multi();

        multi.incr(redisKey);
        multi.pexpire(redisKey, ttl);

        const results = await multi.exec();
        if (!results) {
            throw new Error('Redis transaction failed');
        }

        const totalHits = (results[0][1] as number) || 0;
        const timeToExpire = ttl;

        return {
            totalHits,
            timeToExpire,
            isBlocked: totalHits > limit,
            timeToBlockExpire: totalHits > limit ? blockDuration : 0,
        };
    }

    onModuleDestroy() {
        this.redis.disconnect();
    }
}
