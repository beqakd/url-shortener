import { AggregateRoot } from '@nestjs/cqrs';
import { NonFunctionProperties } from '../../../../libs/common/src';
import { ClickCountIncreasedEvent, UrlShortenedEvent } from '../events/url.events';

export type UrlConstructor = Pick<
  NonFunctionProperties<Omit<Url, 'props'>>,
  'id' | 'url' | 'clicks' | 'expiresAt' | 'createdAt' | 'updatedAt'
>;

export class Url extends AggregateRoot {
  readonly id: string;
  readonly url: string;
  readonly expiresAt: number;
  clicks: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: UrlConstructor) {
    super();
    Object.assign(this, props);
  }

  get shortenedUrl(): string {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const shortenedUrl = `${baseUrl}/${this.id}`;

    return shortenedUrl;
  }

  shortenUrl(): void {
    if (this.isExpired()) {
      throw new Error('Url is expired');
    }

    // apply
    this.apply(
      new UrlShortenedEvent({
        url: this,
      }),
    );
  }

  increaseClickCount(): void {
    this.clicks++;

    // apply
    this.apply(
      new ClickCountIncreasedEvent({
        url: this,
      }),
    );
  }

  static create(props: UrlConstructor): Url {
    return new Url(props);
  }

  isExpired(): boolean {
    return this.expiresAt < Date.now();
  }

  toJSON(): UrlConstructor {
    return this.toPrimitives();
  }

  toString(): string {
    return JSON.stringify(this.toPrimitives());
  }

  private toPrimitives(): UrlConstructor {
    return {
      id: this.id,
      url: this.url,
      clicks: this.clicks,
      expiresAt: this.expiresAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
