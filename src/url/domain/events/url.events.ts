import { BaseEvent } from '@libs/common';
import { Url } from '../entity/url';

export class UrlShortenedEvent extends BaseEvent<UrlShortenedEvent> {
  public readonly url: Url;
}
