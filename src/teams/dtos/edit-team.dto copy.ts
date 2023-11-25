import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditTeamDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumberString()
  @IsOptional()
  maxMember?: number;

  @IsDateString()
  @IsOptional()
  startedAt?: Date;

  @IsDateString()
  @IsOptional()
  endedAt?: Date;
}
