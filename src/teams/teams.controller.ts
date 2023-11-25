import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseBody, SuccessResponse } from 'src/common/response/response';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { RESPONSE_CODE } from 'src/common/response/response.code';
import { EditTeamDto } from './dtos/edit-team.dto copy';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/users.entity';
import { JwtAuthGuard } from 'src/common/decorator/auth/jwt/jwt.guard';

@Controller('team')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  async createTeam(
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<ResponseBody> {
    this.teamsService.createTeam(createTeamDto, null);
    return SuccessResponse(RESPONSE_CODE[2000], null);
  }

  @Put('/:teamId')
  @UseGuards(JwtAuthGuard)
  async editTeam(
    @AuthUser() user: User,
    @Body() editTeamDto: EditTeamDto,
    @Param('teamId') teamId: string,
  ): Promise<ResponseBody> {
    await this.teamsService.editTeam(user, teamId, editTeamDto);
    return SuccessResponse(RESPONSE_CODE[2000], null);
  }
}
