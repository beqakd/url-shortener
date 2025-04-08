export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type OffsetPaginatedResponse<T> = {
  page: number;
  limit: number;
  firstPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
  total: number;
  data: T[];
};
