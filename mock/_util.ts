type ResultState = 'success' | 'error';

interface ResultModel<T> {
  code: number;
  data: T;
  message: string;
  type: ResultState;
}

export function resultSuccess<T = Recordable>(
  data: T,
  { message = 'ok' } = {}
): ResultModel<T> {
  return {
    code: 200,
    data,
    message,
    type: 'success',
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {}
): ResultModel<{
  list: T[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}> {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      list: pageData,
      pagination: {
        page: page,
        size: pageSize,
        total: list.length,
      },
      message,
    }),
  };
}

export function resultError(
  message = 'Request failed',
  { code = -1, result = null } = {}
): ResultModel<any> {
  return {
    code,
    data: result,
    message,
    type: 'error',
  };
}

export function pagination<T = any>(
  page: number,
  pageSize: number,
  array: T[]
): T[] {
  const offset = (page - 1) * Number(pageSize);

  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}
