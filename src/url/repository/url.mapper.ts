import Prisma from '@prisma/client';
import { Url } from '../domain/entity/url';

export class UrlMapper {
  // Map command to entity
  public static toDomain(data: Prisma.Url): Url {
    return Url.create({
      id: data.id,
      url: data.url,
      expiresAt: data.expiresAt.getTime(),

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
