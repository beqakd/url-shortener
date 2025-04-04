import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUrl } from '.';

export function swaggerDocs() {
  return applyDecorators(
    // Utils
    ApiTags('url'),
    // Response
    // Response
    ApiCreatedResponse({
      description: 'Url created',
    }),
    ApiCreatedResponse({
      type: CreateUrl.HttpResponseDto,
      description: 'Url created',
    }),
  );
}
