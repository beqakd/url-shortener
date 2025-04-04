import type { Faker } from '@faker-js/faker';
import { Seeder } from './seeder.abstract';
import type { PrismaService } from 'nestjs-prisma';

export class ModuleSeeder extends Seeder {
  constructor(
    override readonly faker: Faker,
    override readonly prisma: PrismaService,
  ) {
    super(faker, prisma, { isModule: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async run(): Promise<void> {}
}
