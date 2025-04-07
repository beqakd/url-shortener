import { Seeder } from '../../../libs/common/src';
import { generateShortCode } from '../domain/utils';

export class UrlSeeder extends Seeder {
  public async run(): Promise<void> {
    await this.createTestUrls();
  }

  private async createTestUrls(): Promise<void> {
    for (const url of urls) {
      await this.prisma.url.create({
        data: {
          id: generateShortCode(),
          url: url.originalUrl,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
    console.log('Test URLs created successfully.');
  }
}

const urls = [
  {
    originalUrl: 'https://example.com/1',
  },
  {
    originalUrl: 'https://example.com/2',
  },
  {
    originalUrl: 'https://example.com/3',
  },
];
