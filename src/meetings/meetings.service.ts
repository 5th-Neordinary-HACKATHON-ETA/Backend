import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { CreateDto } from './dtos/request/create.dto';
import { ResponseBody, SuccessResponse } from '../common/response/response';
import { RESPONSE_CODE } from '../common/response/response.code';
import { Team } from '../teams/entities/team.entity';
import { Exception } from '../common/response/exception';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>, //이 repository가 DB에 있던 정보를 불러온 것
  ) {}

  async create(createDto: CreateDto): Promise<ResponseBody> {
    //여기에 있는 createDto가 클라로부터 body로 넘어온 것
    const teamInDto: Team = await this.teamsRepository.findOne({
      // teamInDto는 teams 테이블에서 id가 body로 입력받은 teamId와 일치한 Team 전체가 저장된다.
      where: { id: createDto.teamId },
    });

    if (teamInDto == undefined) {
      throw new Exception(RESPONSE_CODE[24040], null);
    }

    const meeting: Meeting = this.meetingsRepository.create();
    meeting.team = teamInDto;
    meeting.name = createDto.name;
    meeting.duration = createDto.duration;
    meeting.location = createDto.location;

    await this.meetingsRepository.save(meeting);
    return SuccessResponse(RESPONSE_CODE[2000], { id: meeting.id });
  }
}
