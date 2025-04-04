import { PrismaService } from 'nestjs-prisma';
import { UrlMapper } from './url.mapper';
import {
  UnableToCreateUrlError,
  UrlNotFoundError,
} from '../domain/errors/url.errors';
import { Url } from '../domain/entity/url';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlRepository {
  constructor(readonly prismaService: PrismaService) {}

  async createUrl(url: string, ttl = 7): Promise<Url> {
    let tries = 0;
    while (true) {
      const code = generateShortCode();
      try {
        const shortenedUrl = await this.prismaService.url.create({
          data: {
            id: code,
            url,
            expiresAt: new Date(Date.now() + ttl * 24 * 60 * 60 * 1000),

            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        return UrlMapper.toDomain(shortenedUrl);
      } catch (e) {
        if (tries > 5) {
          throw new UnableToCreateUrlError(`Unable to create url: ${e}`);
        }
        tries++;
      }
    }
  }

  async findById(id: string): Promise<Url> {
    const url = await this.prismaService.url.findUnique({
      where: { id },
    });

    if (!url) {
      throw new UrlNotFoundError(`Url with id ${id} not found`);
    }

    return UrlMapper.toDomain(url);
  }
}
