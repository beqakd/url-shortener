import { BaseEvent } from '@libs/common';
import { Url } from '../entity/url';

export class UrlShortenedEvent extends BaseEvent<UrlShortenedEvent> {
  public readonly url: Url;
}

export class ClickCountIncreasedEvent extends BaseEvent<ClickCountIncreasedEvent> {
  public readonly url: Url;
}
