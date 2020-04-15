export type ApiErrorType = 'INTERNAL' | 'NO_RESPONSE' | 'API_ERROR';

export type ApiError = {
  type: ApiErrorType;
  statusCode?: number;
  message?: string;
};

export function isAuthorizationError(error?: ApiError) {
  return error?.type === 'API_ERROR' && (error?.statusCode === 401 || error?.statusCode === 403);
}
