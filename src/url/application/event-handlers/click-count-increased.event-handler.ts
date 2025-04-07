import { Logger } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClickCountIncreasedEvent } from 'src/url/domain/events/url.events';
import { UrlRepository } from 'src/url/repository/url.repository';

@EventsHandler(ClickCountIncreasedEvent)
export class ClickCountIncreasedHandler
  implements IEventHandler<ClickCountIncreasedEvent>
{
  private readonly logger = new Logger(ClickCountIncreasedHandler.name);
  constructor(private readonly urlRepository: UrlRepository) {}

  async handle(event: ClickCountIncreasedEvent) {
    this.logger.debug(
      `[Event Handler] Click count increased for URL: ${event.url.id}`,
    );

    await this.urlRepository.incrementClickCount(event.url.id);
    this.logger.debug(
      `[Event Handler] Click count incremented for URL: ${event.url.id}`,
    );
  }
}
