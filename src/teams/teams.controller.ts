import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ResponseBody, SuccessResponse } from 'src/common/response/response';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { RESPONSE_CODE } from 'src/common/response/response.code';
import { JwtAuthGuard } from '../common/decorator/auth/jwt/jwt.guard';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/users.entity';

@Controller('team')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /* 팀 생성하기 */
  @Post()
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<ResponseBody> {
    await this.teamsService.createTeam(createTeamDto, null);
    return SuccessResponse(RESPONSE_CODE[2000], null);
  }

  /* 팀 조회하기 */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getTeam(@AuthUser() user: User): Promise<ResponseBody> {
    const teams = await this.teamsService.getTeam(user);
    return SuccessResponse(RESPONSE_CODE[2000], {
      teams,
    });
  }
}
