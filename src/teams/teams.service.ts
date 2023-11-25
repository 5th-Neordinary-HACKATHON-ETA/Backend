import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { IsNull, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Participant } from '../relationentities/participant.entity';
import { EditTeamDto } from './dtos/edit-team.dto copy';
import { Exception } from 'src/common/response/exception';
import { RESPONSE_CODE } from 'src/common/response/response.code';
import { Meeting } from '../meetings/entities/meeting.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
  ) {}

  /* 팀 생성하기 */
  async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<void> {
    const team = new Team();
    team.boss = user;
    team.maxMember = createTeamDto.maxMember;
    team.name = createTeamDto.name;
    team.startedAt = createTeamDto.startedAt;
    team.endedAt = createTeamDto.endedAt;
    const participant = new Participant();
    participant.user = user;
    participant.team = team; // team 엔티티의 id가 채워짐.
    await this.teamRepository.save(team); // 팀 생성 정보 저장
    await this.participantRepository.save(participant); // 팀 참가자 목록에 팀장 정보 저장
  }

  /* 팀 조회하기 */
  async getTeam(user: User): Promise<Team[]> {
    const participants = await this.participantRepository.find({
      where: { user: { id: user.id } },
      relations: ['team'],
    });
    return participants.map((participants) => participants.team);
  }

  /* 팀 수정하기 */
  async editTeam(
    user: User,
    teamId: string,
    editTeamDto: EditTeamDto,
  ): Promise<void> {
    const team = await this.teamRepository.findOne({
      where: {
        id: teamId,
      },
      relations: ['boss'],
    });
    console.dir(user);
    if (team === null) {
      throw new Exception(RESPONSE_CODE[4040], null);
    }
    if (team.boss.id !== user.id) {
      throw new Exception(RESPONSE_CODE[4030], null);
    }
    team.name = editTeamDto.name || team.name;
    team.maxMember = editTeamDto.maxMember || team.maxMember;
    team.startedAt = editTeamDto.startedAt || team.startedAt;
    team.endedAt = editTeamDto.endedAt || team.endedAt;
    await this.teamRepository.save(team);
  }

  /* 팀 메인 화면 조회 */
  async getTeamMain(teamId: string): Promise<any> {
    // 최신 회의
    const meeting = await this.meetingsRepository.findOne({
      where: [
        {
          dateTime: IsNull(),
          team: { id: teamId },
        },
        {
          dateTime: MoreThan(new Date()),
          team: { id: teamId },
        },
      ],
      relations: ['team', 'possibleTimes', 'possibleTimes.user'],
    });
    // 공지사항, 지난 회의 3개
    const previously = await this.meetingsRepository
      .createQueryBuilder('meeting')
      .where('meeting.dateTime < :currentDate', { currentDate: new Date() })
      .andWhere('meeting.dateTime IS NOT NULL')
      .andWhere('meeting.teamId = :teamId', { teamId })
      .orderBy('meeting.dateTime', 'DESC')
      .take(3)
      .leftJoinAndSelect('meeting.team', 'team')
      .leftJoinAndSelect('meeting.announcement', 'announcement')
      .getMany();
    return {
      previously,
      meeting,
    };
  }

  /* 팀 참여하기 */
  async joinTeam(user: User, teamId: string): Promise<void> {
    const team = await this.teamRepository.findOne({
      where: {
        id: teamId,
      },
    });
    if (team === null) {
      throw new Exception(RESPONSE_CODE[4040], null);
    }
    const participant = await this.participantRepository.findOne({
      where: {
        user: { id: user.id },
        team: { id: team.id },
      },
    });
    if (participant !== null) {
      throw new Exception(RESPONSE_CODE[24090], null);
    }
    const newParticipant = new Participant();
    newParticipant.team = team;
    newParticipant.user = user;
    await this.participantRepository.save(newParticipant);
  }
}
