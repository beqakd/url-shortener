import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { urlRoot, urlRoutes } from '../../configs/app.route';
import { RedirectUrl } from '.';
import { UrlRepository } from '../../repository/url.repository';
import { Response } from 'express';

@Controller(urlRoot)
export class HttpController {
  constructor(private readonly repository: UrlRepository) {}

  @Get(urlRoutes.get)
  @RedirectUrl.swaggerDocs()
  async createWallet(
    @Param() param: RedirectUrl.HttpBodyRequestDto,
    @Res() response: Response,
  ): Promise<RedirectUrl.HttpResponseDto> {
    const url = await this.repository.findById(param.url);
    const redirectedUrl = url.url;

    response.redirect(redirectedUrl);
  }
}
