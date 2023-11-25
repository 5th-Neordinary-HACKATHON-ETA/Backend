import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ResponseBody, SuccessResponse } from 'src/common/response/response';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { RESPONSE_CODE } from 'src/common/response/response.code';
import { EditTeamDto } from './dtos/edit-team.dto copy';

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
  async editTeam(
    @Body() editTeamDto: EditTeamDto,
    @Param('teamId') teamId: string,
  ): Promise<ResponseBody> {
    await this.teamsService.editTeam(teamId, editTeamDto);
    return SuccessResponse(RESPONSE_CODE[2000], null);
  }
}
