import { Processor, WorkerHost } from '@nestjs/bullmq';
import { URL_QUEUE, UrlListenerJob } from './utils';
import { Logger } from '@nestjs/common';
import { UrlRepository } from 'src/url/repository/url.repository';

@Processor(URL_QUEUE)
export class CleanExpiredUrlsProcessor extends WorkerHost {
  private readonly logger = new Logger(CleanExpiredUrlsProcessor.name);

  constructor(private readonly urlRepository: UrlRepository) {
    super();
  }

  async process(job: UrlListenerJob) {
    this.logger.debug('FinishRaceConsumer Executed!');

    const { id } = job.data;

    await this.urlRepository.deleteUrl(id);

    this.logger.log(`Url with id ${id} deleted successfully.`);
  }
}
