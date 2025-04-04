export class UrlNotFoundError extends Error {
  public readonly code = 'URL.NOT_FOUND';

  constructor(message: string) {
    super(message);
  }
}

export class UrlAlreadyExistsError extends Error {
  public readonly code = 'URL.ALREADY_EXISTS';

  constructor(message: string) {
    super(message);
  }
}

export class UnableToCreateUrlError extends Error {
  public readonly code = 'URL.UNABLE_TO_CREATE';

  constructor(message: string) {
    super(message);
  }
}

export class UrlExpiredError extends Error {
  public readonly code = 'URL.EXPIRED';

  constructor(message: string) {
    super(message);
  }
}
