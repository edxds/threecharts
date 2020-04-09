import { AxiosError } from 'axios';

import { ApiResult } from './api-result';

export function handleApiError<T>(error: AxiosError): ApiResult<T> {
  if (error.response) {
    return ApiResult.fail({
      type: 'API_ERROR',
      statusCode: error.response.status,
      message: error.response.data.message,
    });
  }

  if (error.request) {
    return ApiResult.fail({ type: 'NO_RESPONSE', message: error.message });
  }

  return ApiResult.fail({ type: 'INTERNAL', message: error.message });
}
