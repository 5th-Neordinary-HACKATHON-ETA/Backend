import { HttpException } from '@nestjs/common';
import { ResponseCode } from './response.code';

export class Exception extends HttpException {
  public readonly code: number;

  constructor(
    responseCode: ResponseCode,
    public readonly error: Record<string, unknown> | null,
  ) {
    super(responseCode.message, responseCode.status);
    this.code = responseCode.code;
  }
}
