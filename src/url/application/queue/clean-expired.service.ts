// This class is going to get event after url creating
// and add it to queue

import { InjectQueue } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UrlShortenedEvent } from 'src/url/domain/events/url.events';
import { URL_QUEUE, UrlListenerQueue } from './utils';

@EventsHandler(UrlShortenedEvent)
export class CleanExpiredUrlsService implements IEventHandler<UrlShortenedEvent> {
  private readonly logger = new Logger(CleanExpiredUrlsService.name);
  constructor(@InjectQueue(URL_QUEUE) private readonly queue: UrlListenerQueue) {}

  async handle(event: UrlShortenedEvent) {
    this.logger.log(`URL shortened event received: ${event.url.id}`);

    // Add to Queue
    const job = await this.queue.add(
      event.url.id,
      {
        id: event.url.id,
      },
      {
        delay: event.url.expiresAt - Date.now(),
      },
    );

    console.log('job', JSON.stringify(job));
  }
}
