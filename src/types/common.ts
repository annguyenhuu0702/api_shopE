export interface batchPayload {
  count: number;
}

export interface responseBatchPayload {
  status: number;
  data: batchPayload;
}

export interface responseMessage {
  status: number;
  data: { message: string };
}

export interface responseType<T> {
  status: number;
  data: { data: T | null; message?: string };
}

export interface responseData<T> {
  status: number;
  data: {
    data: {
      rows: T;
      count: number;
    };
    message?: string;
  };
}

export interface responseItemsType<T> {
  items: T[];
  totalResult?: number;
  totalPage?: number;
  limit?: number;
}

export interface responseItems<T> {
  status: number;
  data: T;
}

export interface queryItems {
  limit?: string;
  p?: string;
  q?: string;
  all?: string;
  depth?: string;
  sortBy?: string;
  sortType?: string;
}
