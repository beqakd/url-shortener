import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { urlRoot, urlRoutes } from '../../configs/app.route';
import { RedirectUrl } from '.';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller(urlRoot)
@ApiTags(urlRoot)
export class HttpController {
  constructor(private readonly redirectUrlService: RedirectUrl.Service) {}

  @Get(urlRoutes.get)
  @RedirectUrl.swaggerDocs()
  async createWallet(
    @Param() param: RedirectUrl.HttpBodyRequestDto,
    @Res() response: Response,
  ): Promise<RedirectUrl.HttpResponseDto> {
    const url = await this.redirectUrlService.execute(
      new RedirectUrl.Command({
        url: param.url,
      }),
    );

    const redirectedUrl = url.url;

    response.redirect(redirectedUrl);
  }
}
