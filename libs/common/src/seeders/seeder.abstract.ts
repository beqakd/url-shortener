import type { Faker } from '@faker-js/faker';
import type { PrismaService } from 'nestjs-prisma';

type SeederCls = new (faker: Faker, prisma: PrismaService) => Seeder;

type CallOpts = {
  isModule?: boolean;
};

export abstract class Seeder {
  constructor(
    readonly faker: Faker,
    readonly prisma: PrismaService,
    readonly callOpts?: CallOpts,
  ) {}

  async call(seederCls: SeederCls): Promise<void> {
    const seeder = new seederCls(this.faker, this.prisma);

    if (process.env['LOG_SEEDERS'] === 'true') {
      if (!this.isModule) {
        console.log(`${seederCls.name}`);
      } else {
        process.stdout.write(`\t${seederCls.name}`.padEnd(30));
      }
    }
    const startTime = Date.now();
    await seeder.run();
    const endTime = Date.now();

    const timeInMs = (endTime - startTime) / 1000;

    if (process.env['LOG_SEEDERS'] === 'true') {
      if (this.isModule) process.stdout.write(`${timeInMs}s\n`);
    }
  }

  get isModule(): boolean {
    return this.callOpts?.isModule ?? false;
  }

  abstract run(): Promise<void>;
}
