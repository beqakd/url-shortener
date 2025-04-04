import { AggregateRoot } from '@nestjs/cqrs';

export abstract class AggregateRootBase extends AggregateRoot {
  constructor() {
    super();
    // this.validate();
  }

  abstract validate(): void;
}
