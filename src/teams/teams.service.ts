import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<void> {
    const team = new Team();
    team.boss = user;
    team.maxMember = createTeamDto.maxMember;
    team.name = createTeamDto.name;
    team.startedAt = createTeamDto.startedAt;
    team.endedAt = createTeamDto.endedAt;
    this.teamRepository.save(team);
  }
}
