import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Participant } from '../relationentities/participant.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  /* 팀 생성하기 */
  async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<void> {
    const team = new Team();
    team.boss = user;
    team.maxMember = createTeamDto.maxMember;
    team.name = createTeamDto.name;
    team.startedAt = createTeamDto.startedAt;
    team.endedAt = createTeamDto.endedAt;
    await this.teamRepository.save(team);
  }

  /* 팀 조회하기 */
  async getTeam(user: User): Promise<Team[]> {
    const participants = await this.participantRepository.find({
      where: { id: user.id },
      relations: ['team'],
    });
    return participants.map((participants) => participants.team);
  }
}
