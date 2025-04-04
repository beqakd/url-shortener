import { ApiProperty } from '@nestjs/swagger';
import { ApiSchema } from '@libs/common';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({ name: '[Url]' })
export class HttpBodyRequestDto {
  @ApiProperty({
    description: 'Url to be shortened',
    example: 'https://www.example.com/',
  })
  @IsNotEmpty()
  @IsString()
  url: string;
}
