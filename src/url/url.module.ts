import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UrlHttpExceptionsFilter } from './exception-filters/exception-filters';
import { AppConfigService } from './configs/app-config.service';
import { UrlRepository } from './repository/url.repository';
import { CreateUrl } from './commands/create-url';
import { BullModule } from '@nestjs/bullmq';
import { URL_QUEUE } from './application/queue/utils';
import { CleanExpiredUrlsService } from './application/queue/clean-expired.service';
import { CleanExpiredUrlsProcessor } from './application/queue/clean-expired.processor';
import { ClickCountIncreasedHandler } from './application/event-handlers/click-count-increased.event-handler';
import { RedirectUrl } from './queries/redirect-url';

@Module({
  imports: [
    // Register queue
    BullModule.registerQueue({
      name: URL_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
    }),
  ],
  controllers: [CreateUrl.HttpController, RedirectUrl.HttpController],
  providers: [
    // Commands
    CreateUrl.Service,
    RedirectUrl.Service,

    // Repositories
    UrlRepository,

    // Queue
    CleanExpiredUrlsService,
    CleanExpiredUrlsProcessor,

    // Event Handlers
    ClickCountIncreasedHandler,

    // Extra
    AppConfigService,
    {
      provide: APP_FILTER,
      useClass: UrlHttpExceptionsFilter,
    },
  ],
  exports: [],
})
export class UrlModule {}
