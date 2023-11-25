import { IsDateString, IsString } from 'class-validator';

export class TimeDto {
  @IsString()
  meetId!: string;

  @IsDateString()
  date!: Date;
}
