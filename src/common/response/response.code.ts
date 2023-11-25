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
  4040: {
    code: 4040,
    message: '유저 정보가 존재하지 않습니다.',
    status: HttpStatus.NOT_FOUND,
  },
  4090: {
    code: 4090,
    message: '이미 존재하는 유저입니다.',
    status: HttpStatus.CONFLICT,
  },
};
