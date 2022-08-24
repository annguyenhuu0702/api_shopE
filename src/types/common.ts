export interface BatchPayload {
  count: number;
}

export interface ResponseBatchPayload {
  status: number;
  data: BatchPayload;
}

export interface ResponseMessage {
  status: number;
  data: { message: string };
}

export interface ResponseType<T> {
  status: number;
  data: { data: T | null; message?: string };
}

export interface ResponseTypePagination<T> {
  status: number;
  data: {
    data: {
      rows: T;
      count: number;
    };
    message?: string;
  };
}

export interface ResponseItemsType<T> {
  items: T[];
  totalResult?: number;
  totalPage?: number;
  limit?: number;
}

export interface ResponseItems<T> {
  status: number;
  data: T;
}

export interface QueryItems {
  limit?: string;
  p?: string;
  all?: string;
  depth?: string;
  sortBy?: string;
  sortType?: string;
  q?: string;
}
