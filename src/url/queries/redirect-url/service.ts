import { Injectable, Logger } from '@nestjs/common';
import { BaseCommand } from '../../../../libs/common/src';
import { EventPublisher } from '@nestjs/cqrs';
import { UrlRepository } from '../../repository/url.repository';

export class Command extends BaseCommand<Command> {
  readonly url: string;
}

export type CommandOutput = string;

@Injectable()
export class Service {
  private readonly logger = new Logger('CreateWallet.Service');

  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: UrlRepository,
  ) {}

  public async execute(cmd: Command): Promise<CommandOutput> {
    this.logger.debug(`Command: ${JSON.stringify(cmd)}`);

    const url = this.publisher.mergeObjectContext(
      await this.repository.findById(cmd.url),
    );

    url.increaseClickCount();

    url.commit();

    return url.id;
  }
}
