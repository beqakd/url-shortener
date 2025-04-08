import { ArgumentsHost, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  InvalidShortCode,
  UnableToCreateUrlError,
  UrlAlreadyExistsError,
  UrlExpiredError,
  UrlNotFoundError,
} from '../domain/errors/url.errors';

const _errors = [
  UrlNotFoundError,
  UrlAlreadyExistsError,
  UnableToCreateUrlError,
  UrlExpiredError,
  InvalidShortCode,
];

type ErrorTypes = (typeof _errors)[number];

export class UrlHttpExceptionsFilter extends BaseExceptionFilter {
  override catch(exception: ErrorTypes, host: ArgumentsHost) {
    if (exception instanceof UrlNotFoundError) {
      return super.catch(new NotFoundException(exception.message), host);
    }

    if (exception instanceof UrlAlreadyExistsError) {
      return super.catch(new NotFoundException(exception.message), host);
    }

    if (exception instanceof UnableToCreateUrlError) {
      return super.catch(new NotFoundException(exception.message), host);
    }

    if (exception instanceof UrlExpiredError) {
      return super.catch(new NotFoundException(exception.message), host);
    }

    if (exception instanceof InvalidShortCode) {
      return super.catch(new NotFoundException(exception.message), host);
    }

    return super.catch(exception, host);
  }
}
