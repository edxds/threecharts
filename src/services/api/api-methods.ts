import { AxiosInstance, AxiosError } from 'axios';

import { UserWeeksDto } from '@threecharts/models/UserWeeksDto';
import { AuthorizationUrlDto } from '@threecharts/models/AuthorizationUrlDto';
import { UserDto } from '@threecharts/models/UserDto';

import { ApiResult } from './api-result';
import { handleApiError } from './handle-api-error';

export const getAuthorizationUrl = (
  instance: AxiosInstance,
  callbackUrl: string,
): Promise<ApiResult<AuthorizationUrlDto>> =>
  instance
    .get(`/authorization/url?callback=${callbackUrl}`)
    .then((response) => ApiResult.ok(response.data as AuthorizationUrlDto))
    .catch((error) => handleApiError(error as AxiosError));

export const tryAuthorize = (instance: AxiosInstance, token: string): Promise<ApiResult<UserDto>> =>
  instance
    .post(`/authorization/authorize`, { token })
    .then((response) => ApiResult.ok(response.data as UserDto))
    .catch((error) => handleApiError(error as AxiosError));

export const getUserDetails = (instance: AxiosInstance): Promise<ApiResult<UserDto>> =>
  instance
    .get('/user/details')
    .then((response) => ApiResult.ok(response.data as UserDto))
    .catch((error) => handleApiError(error as AxiosError));

export const getWeeks = (
  instance: AxiosInstance,
  userId: number,
): Promise<ApiResult<UserWeeksDto>> =>
  instance
    .get(`/charts/weeks/${userId}`)
    .then((response) => ApiResult.ok(response.data as UserWeeksDto))
    .catch((error) => handleApiError(error as AxiosError));
