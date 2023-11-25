import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FailedResponse } from './response';
import { Exception } from './exception';
import { RESPONSE_CODE } from './response.code';

@Catch(HttpException)
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = exception.getStatus();
    if (exception.getStatus() === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(`[${exception}]
${exception.stack || ''}`);
      exception = new Exception(RESPONSE_CODE[5000], {
        cause: exception.cause,
      });
    }

    response.status(status).json(FailedResponse(exception));
  }
}
