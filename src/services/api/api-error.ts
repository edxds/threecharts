export type ApiErrorType = 'INTERNAL' | 'NO_RESPONSE' | 'API_ERROR';

export type ApiError = {
  type: ApiErrorType;
  statusCode?: number;
  message?: string;
};
