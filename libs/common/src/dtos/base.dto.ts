import { ApiProperty } from '@nestjs/swagger';

export class BaseDto<T> {
  constructor(data: T) {
    Object.assign(this, data);
  }
}

export abstract class OffsetPaginatedResponseDto<T> {
  constructor(props: OffsetPaginatedResponseDto<T>) {
    Object.assign(this, props);
  }

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  readonly limit: number;

  @ApiProperty({ example: 3, description: 'Current page number' })
  readonly page: number;

  @ApiProperty({
    example: 70,
    description: 'total number of',
  })
  readonly total: number;

  @ApiProperty({
    example: 1,
    description: 'First page number',
  })
  readonly firstPage: number;

  @ApiProperty({
    example: 3,
    description: 'Previous page number if exists',
  })
  readonly prevPage: number | null;

  @ApiProperty({
    example: 5,
    description: 'Next page number if exists',
  })
  readonly nextPage: number | null;

  @ApiProperty({
    example: 7,
    description: 'Last page number',
  })
  readonly lastPage: number;

  @ApiProperty({
    example: 'https://api.defiland.app/lobbies?page=1',
    description: 'First page URL if exists',
  })
  readonly firstPageUrl: string;

  @ApiProperty({
    example: 'https://api.defiland.app/lobbies?page=3',
    description: 'Previous page URL if exists',
  })
  readonly prevPageUrl: string | null;

  @ApiProperty({
    example: 'https://api.defiland.app/lobbies?page=5',
    description: 'Next page URL if exists.',
  })
  readonly nextPageUrl: string | null;

  @ApiProperty({
    example: 'https://api.defiland.app/lobbies?page=7',
    description: 'Next page URL if exists.',
  })
  readonly lastPageUrl: string;

  @ApiProperty({ isArray: true })
  readonly data: readonly T[];
}
