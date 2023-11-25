import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { JwtAuthGuard } from '../common/decorator/auth/jwt/jwt.guard';
import { AuthUser } from '../auth/auth-user.decorator';
import { ResponseBody } from '../common/response/response';
import { User } from '../users/entities/users.entity';
import { CreateDto } from './dtos/request/create.dto';
import { PossibleTimeDto } from './dtos/request/possible-time.dto';

@Controller('meetings') //미들웨어라고 보면 됨. domain/teams/ ~~ 로 시작한다고 정해준다.
export class MeetingsController {
  constructor(private readonly meetingService: MeetingsService) {} //meetingService는 변수명, MeetingsService는 객체  즉, teamsService라는 이름의 TeamsService 객체를 생성해준 것

  @Post('/meet')
  @UseGuards(JwtAuthGuard) // jwt에 있는 정보를 가지고 DB에서 조회를 한 뒤 유저를 넘겨주고, @AuthUser에서 유저 정보를 불러와 사용한다.
  async create(
    @AuthUser() user: User,
    @Body() createDto: CreateDto, // create.dto에서 정의해줌
  ): Promise<ResponseBody> {
    return await this.meetingService.create(createDto);
  }

  @Post('/possible-time')
  @UseGuards(JwtAuthGuard)
  async possibleTime(
    @AuthUser() user: User,
    @Body() timeDto: PossibleTimeDto,
  ): Promise<ResponseBody> {
    return await this.meetingService.possibleTime(timeDto, user);
  }
}
