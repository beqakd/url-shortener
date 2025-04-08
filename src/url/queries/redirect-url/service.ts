import { Injectable, Logger } from '@nestjs/common';
import { BaseCommand } from '../../../../libs/common/src';
import { EventPublisher } from '@nestjs/cqrs';
import { UrlRepository } from '../../repository/url.repository';
import { Url } from 'src/url/domain/entity/url';
import { InvalidShortCode } from 'src/url/domain/errors/url.errors';

export class Command extends BaseCommand<Command> {
  readonly url: string;
}

export type CommandOutput = Url;

@Injectable()
export class Service {
  private readonly logger = new Logger('CreateWallet.Service');

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: UrlRepository,
  ) {}

  public async execute(cmd: Command): Promise<CommandOutput> {
    this.logger.debug(`Command: ${JSON.stringify(cmd)}`);

    // split if its full domain
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const code = cmd.url.includes(baseUrl) ? cmd.url.split(baseUrl)[1] : cmd.url;

    if (!/^[A-Za-z0-9]{6,10}$/.test(code)) {
      throw new InvalidShortCode('Invalid short code format');
    }

    const url = this.publisher.mergeObjectContext(await this.repository.findById(code));

    url.increaseClickCount();

    url.commit();

    return url;
  }
}
