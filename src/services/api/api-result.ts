import { ApiError } from './api-error';

// From: https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
export class ApiResult<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: ApiError;
  private _value?: T;

  private constructor(isSuccess: boolean, error?: ApiError, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
        successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
        needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public value(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value as T;
  }

  public static ok<U>(value?: U): ApiResult<U> {
    return new ApiResult<U>(true, undefined, value);
  }

  public static fail<U>(error: ApiError): ApiResult<U> {
    return new ApiResult<U>(false, error);
  }

  public static combine(results: ApiResult<void>[]): ApiResult<void> {
    for (const result of results) {
      if (result.isFailure) return result;
    }

    return ApiResult.ok<void>();
  }
}
