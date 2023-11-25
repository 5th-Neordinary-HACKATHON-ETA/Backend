import { HttpStatus } from '@nestjs/common';

export interface ResponseCode {
  code: number;
  message: string;
  status: HttpStatus;
}

export const RESPONSE_CODE: Record<number, ResponseCode> = {
  2000: {
    code: 2000,
    message: '성공',
    status: HttpStatus.OK,
  },
  4000: {
    code: 4000,
    message: 'Validation 실패',
    status: HttpStatus.BAD_REQUEST,
  },
  5000: {
    code: 5000,
    message: '서버 에러',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};
