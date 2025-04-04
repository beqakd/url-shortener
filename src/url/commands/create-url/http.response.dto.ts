import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema, BaseDto } from '@libs/common';

@ApiSchema({ name: '[Url] Get Shortened Url' })
export class HttpResponseDto extends BaseDto<HttpResponseDto> {
  @ApiProperty({
    description: 'Url to be shortened',
    example: 'https://www.example.com/',
  })
  readonly url: string;
}
