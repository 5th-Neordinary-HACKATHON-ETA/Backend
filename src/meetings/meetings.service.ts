import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { CreateDto } from './dtos/request/create.dto';
import { ResponseBody, SuccessResponse } from '../common/response/response';
import { RESPONSE_CODE } from '../common/response/response.code';
import { Participant } from '../relationentities/participant.entity';
import { Possible_Time } from '../relationentities/possible_time.entity';
import { Team } from '../teams/entities/team.entity';
import { Exception } from '../common/response/exception';
import { PossibleTimeDto } from './dtos/request/possible-time.dto';
import { User } from '../users/entities/users.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
    @InjectRepository(Possible_Time)
    private possible_timesRepository: Repository<Possible_Time>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
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

  async possibleTime(
    timeDto: PossibleTimeDto,
    user: User,
  ): Promise<ResponseBody> {
    const meeting: Meeting = await this.meetingsRepository.findOne({
      where: { id: timeDto.meetId },
      relations: {
        team: true,
      },
    });

    if (!meeting) {
      throw new Exception(RESPONSE_CODE[34040], null);
    }

    const participant: Participant = await this.participantsRepository.findOne({
      where: { team: meeting.team, user: user },
    });

    if (!participant) {
      throw new Exception(RESPONSE_CODE[24030], null);
    }

    const possibleTimeInDb: Possible_Time =
      await this.possible_timesRepository.findOne({
        where: { meeting: meeting, user: user },
      });

    if (possibleTimeInDb) {
      const dbDate = new Date(possibleTimeInDb.possibleTime);
      const inputDate = new Date(timeDto.date);
      if (dbDate.getDate() == inputDate.getDate()) {
        possibleTimeInDb.possibleTime = timeDto.date;
        await this.possible_timesRepository.save(possibleTimeInDb);
      } else {
        const possible_time: Possible_Time =
          this.possible_timesRepository.create();
        possible_time.user = user;
        possible_time.meeting = meeting;
        possible_time.possibleTime = timeDto.date;
        await this.possible_timesRepository.save(possible_time);
      }
    } else {
      const possible_time: Possible_Time =
        this.possible_timesRepository.create();
      possible_time.user = user;
      possible_time.meeting = meeting;
      possible_time.possibleTime = timeDto.date;
      await this.possible_timesRepository.save(possible_time);
    }
    return SuccessResponse(RESPONSE_CODE[2000], null);
  }
}
