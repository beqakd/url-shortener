import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

export function swaggerDocs() {
  return applyDecorators(
    // Utils
    ApiTags('url'),
    // Response
    ApiCreatedResponse({
      description: 'Redirect Url',
    }),
  );
}
