import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'nestjs-prisma';
import { HealthController } from './app.controller';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    PrismaModule.forRoot({ isGlobal: true }),
    UrlModule,
  ],
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export class AppModule {}
