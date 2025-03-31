import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from 'nestjs-prisma';
import { HealthController } from './app.controller';

@Module({
  imports: [CqrsModule.forRoot(), PrismaModule.forRoot({ isGlobal: true })],
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export class AppModule {}
