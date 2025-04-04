import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const configuration = () => ({
  stage: process.env['STAGE'] ?? 'develop',
});

@Injectable()
export class AppConfigService {
  constructor(
    private configService: ConfigService<typeof configuration, true>,
  ) {}

  get stage() {
    return this.configService.getOrThrow('stage');
  }
}
