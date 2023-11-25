import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { EditTeamDto } from './dtos/edit-team.dto copy';
import { Exception } from 'src/common/response/exception';
import { RESPONSE_CODE } from 'src/common/response/response.code';

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
}
