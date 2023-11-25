import { Body, Controller, Post } from '@nestjs/common';
import { ResponseBody, SuccessResponse } from 'src/common/response/response';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { RESPONSE_CODE } from 'src/common/response/response.code';

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
}
