import { Exception } from './exception';
import { ResponseCode } from './response.code';

export type ResponseBody = SuccessResponseBody | FailedResponseBody;

interface SuccessResponseBody {
  isSuccess: true;
  code: number;
  message: string;
  result: Record<string, unknown> | null;
}

interface FailedResponseBody {
  isSuccess: false;
  code: number;
  message: string;
  error: Record<string, unknown> | null;
}

export const SuccessResponse = (
  responseCode: ResponseCode,
  result: Record<string, unknown> | null,
): SuccessResponseBody => ({
  isSuccess: true,
  code: responseCode.code,
  message: responseCode.message,
  result,
});

export const FailedResponse = (exception: Exception): FailedResponseBody => ({
  isSuccess: false,
  message: exception.message,
  code: exception.code,
  error: exception.error,
});
