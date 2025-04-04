import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UrlHttpExceptionsFilter } from './exception-filters/exception-filters';
import { AppConfigService } from './configs/app-config.service';
import { UrlRepository } from './repository/url.repository';
import { CreateUrl } from './commands/create-url';

@Module({
  imports: [],
  controllers: [CreateUrl.HttpController],
  providers: [
    // Commands
    CreateUrl.Service,

    // Repositories
    UrlRepository,

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
