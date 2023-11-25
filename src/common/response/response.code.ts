import { HttpStatus } from '@nestjs/common';

export interface ResponseCode {
  code: number;
  message: string;
  status: HttpStatus;
}

/**
 * @description
 * Response Code
 * USER, AUTH 관련: 1xxxx
 * TEAM 관련: 2xxxx
 * MEETING 관련: 3xxxx
 * ANNOUNCEMENT 관련: 4xxxx
 *
 * 예시:
 * 로그인 실패 USER: 14010
 * 401 = Unauthorized를 의미
 * 0: 경우의 수(id가 없는 경우 혹은 id가 null인 경우 등등 여러 가지 가능)
 */
export const RESPONSE_CODE: Record<number, ResponseCode> = {
  //공통
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

  //USER, AUTH
  14030: {
    code: 4030,
    message: '요청을 준 유저는 방장이 아닙니다.',
    status: HttpStatus.FORBIDDEN,
  },
  14040: {
    code: 14040,
    message: '유저 정보가 존재하지 않습니다.',
    status: HttpStatus.NOT_FOUND,
  },
  14090: {
    code: 14090,
    message: '이미 존재하는 유저입니다.',
    status: HttpStatus.CONFLICT,
  },

  //TEAM
  24040: {
    code: 24040,
    message: '존재하지 않는 팀입니다.',
    status: HttpStatus.NOT_FOUND,
  },

  //MEETING

  //ANNOUNCEMENT
};
