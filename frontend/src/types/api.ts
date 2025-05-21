export interface StrapiResponse<T, IsArray extends boolean = true> {
  data: IsArray extends true ? T[] : T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
