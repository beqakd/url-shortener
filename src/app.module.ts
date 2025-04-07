import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'nestjs-prisma';
import { HealthController } from './health.controller';
import { UrlModule } from './url/url.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './url/configs/app-config.service';

@Module({
  imports: [
    CqrsModule.forRoot(),
    PrismaModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env['REDIS_HOST'] || '127.0.0.1',
        port: Number(process.env['REDIS_PORT']) || 6379,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UrlModule,
  ],
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export class AppModule {}
