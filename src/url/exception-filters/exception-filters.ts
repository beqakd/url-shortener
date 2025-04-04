import { ArgumentsHost, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  UnableToCreateUrlError,
  UrlAlreadyExistsError,
  UrlExpiredError,
  UrlNotFoundError,
} from '../domain/errors/url.errors';

const errors = [
  UrlNotFoundError,
  UrlAlreadyExistsError,
  UnableToCreateUrlError,
  UrlExpiredError,
];

type ErrorTypes = (typeof errors)[number];

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

    return super.catch(exception, host);
  }
}
