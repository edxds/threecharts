import { AxiosInstance, AxiosError } from 'axios';

import { UserWeeksDto } from '@threecharts/models/UserWeeksDto';

import { ApiResult } from './api-result';
import { handleApiError } from './handle-api-error';

export const getWeeks = (
  instance: AxiosInstance,
  userId: number,
): Promise<ApiResult<UserWeeksDto>> =>
  instance
    .get(`/charts/weeks/${userId}`)
    .then((response) => ApiResult.ok(response.data as UserWeeksDto))
    .catch((error) => handleApiError(error as AxiosError));
