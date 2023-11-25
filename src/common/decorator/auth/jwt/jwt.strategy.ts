import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //user db에 접근하기 위해 repository를 주입받음
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //header에서 jwt를 가져옴
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // .env에 있는 JWT_SECRET을 secretOrKey로 사용
    });
  }

  async validate(payload: Payload) {
    //jwt의 payload를 받아 payload의 userId를 이용해 user를 찾고 리턴
    //위에서 추출한 jwt의 payload를 넘겨받음
    const user = await this.usersRepository.findOneBy({ id: payload.userId });
    if (user) {
      return user; //이 user는 request.user에 저장됨(auth/auth-user.decorator.ts로 ㄱㄱ)
    } else {
      throw new NotFoundException('User Not Found');
    }
  }
}
