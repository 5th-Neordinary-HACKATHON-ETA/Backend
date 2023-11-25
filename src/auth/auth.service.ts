import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { ONEDAY, Payload } from '../common/decorator/auth/jwt/jwt.payload';
import { ResponseBody, SuccessResponse } from '../common/response/response';
import { RESPONSE_CODE } from '../common/response/response.code';
import { JoinDto } from './dtos/request/join.dto';
import { LoginDto } from './dtos/request/login.dto';
import { Exception } from '../common/response/exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async join(joinDto: JoinDto): Promise<ResponseBody> {
    if (
      await this.usersRepository.findOne({
        where: [{ id: joinDto.id }, { nickname: joinDto.nickname }],
      })
    ) {
      throw new Exception(RESPONSE_CODE[4090], null);
    }

    const userInDto: User = this.usersRepository.create(joinDto);
    await this.usersRepository.save(userInDto);
    return SuccessResponse(RESPONSE_CODE[2000], { id: userInDto.id });
  }

  async login(loginDto: LoginDto, response: Response): Promise<ResponseBody> {
    const userData = await this.usersRepository.findOne({
      where: {
        id: loginDto.id,
        password: loginDto.password,
      },
    });
    if (!userData) {
      throw new Exception(RESPONSE_CODE[4040], null);
    }

    const payload: Payload = {
      sub: userData.id,
      userId: userData.id,
      period: ONEDAY,
    };

    const sign = this.jwtService.sign(payload);
    response.header('Authorization', 'Bearer ' + sign);
    return SuccessResponse(RESPONSE_CODE[2000], { id: userData.id });
  }
}
