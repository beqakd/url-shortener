import { Body, Controller, Headers, Param, Post } from '@nestjs/common';
import { urlRoot, urlRoutes } from '../../configs/app.route';
import { CreateUrl } from '.';

@Controller(urlRoot)
export class HttpController {
  constructor(private readonly depositService: CreateUrl.Service) {}

  @Post(urlRoutes.create)
  @CreateUrl.swaggerDocs()
  async createWallet(
    @Param() param: CreateUrl.HttpBodyRequestDto,
  ): Promise<CreateUrl.HttpResponseDto> {
    const url = await this.depositService.execute(
      new CreateUrl.Command({
        url: param.url,
      }),
    );

    return new CreateUrl.HttpResponseDto({
      url: url,
    });
  }
}
