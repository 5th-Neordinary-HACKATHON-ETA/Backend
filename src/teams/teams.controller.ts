import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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

  /* 팀 생성하기 */
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTeam(
    @AuthUser() user: User,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<ResponseBody> {
    await this.teamsService.createTeam(createTeamDto, user);
    return SuccessResponse(RESPONSE_CODE[2000], null);
  }

  /* 팀 수정하기 */
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

  /* 팀 조회하기 */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getTeam(@AuthUser() user: User): Promise<ResponseBody> {
    const teams = await this.teamsService.getTeam(user);
    return SuccessResponse(RESPONSE_CODE[2000], {
      teams,
    });
  }

  /* 팀 메인 화면 조회 */
  @Get('/:teamId')
  @UseGuards(JwtAuthGuard)
  async getTeamMain(@Param('teamId') teamId: string): Promise<ResponseBody> {
    const meets = await this.teamsService.getTeamMain(teamId);
    return SuccessResponse(RESPONSE_CODE[2000], {
      meets,
    });
  }
}
