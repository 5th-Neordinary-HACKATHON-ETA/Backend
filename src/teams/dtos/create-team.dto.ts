import { IsDateString, IsNumberString, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name!: string;

  @IsNumberString()
  maxMember!: number;

  @IsDateString()
  startedAt!: Date;

  @IsDateString()
  endedAt!: Date;
}
