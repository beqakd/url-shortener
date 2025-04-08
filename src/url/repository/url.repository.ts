import { PrismaService } from 'nestjs-prisma';
import { UrlMapper } from './url.mapper';
import { UnableToCreateUrlError, UrlNotFoundError } from '../domain/errors/url.errors';
import { Url } from '../domain/entity/url';
import { Injectable } from '@nestjs/common';
import { generateShortCode } from '../domain/utils';

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
      } catch (e: any) {
        if (e.code === 'P2002') {
          // and url unique failed that means long url is already shortened
          if (e.meta.target[0] === 'url') {
            return await this.findByUrl(url);
          }
        }
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

  async findByUrl(url: string): Promise<Url> {
    const shortenedUrl = await this.prismaService.url.findUnique({
      where: { url },
    });

    if (!shortenedUrl) {
      throw new UrlNotFoundError(`Url with url ${url} not found`);
    }

    return UrlMapper.toDomain(shortenedUrl);
  }

  async deleteUrl(id: string) {
    try {
      await this.prismaService.url.delete({
        where: { id },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new UrlNotFoundError(`Url with id ${id} not found`);
      } else {
        throw e;
      }
    }
  }

  async incrementClickCount(id: string): Promise<void> {
    try {
      await this.prismaService.url.update({
        where: { id },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new UrlNotFoundError(`Url with id ${id} not found`);
      } else {
        throw e;
      }
    }
  }
}
