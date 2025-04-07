import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { urlRoot, urlRoutes } from '../../configs/app.route';
import { RedirectUrl } from '.';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags(urlRoot)
export class HttpController {
  constructor(private readonly redirectUrlService: RedirectUrl.Service) {}

  @Get(':url')
  @RedirectUrl.swaggerDocs()
  async redirectUrl(
    @Param() param: RedirectUrl.HttpBodyRequestDto,
    @Res() response: Response,
  ): Promise<RedirectUrl.HttpResponseDto> {
    console.log("AQ var")
    const url = await this.redirectUrlService.execute(
      new RedirectUrl.Command({
        url: param.url,
      }),
    );

    const redirectedUrl = url.url;

    response.redirect(redirectedUrl);
  }
}
