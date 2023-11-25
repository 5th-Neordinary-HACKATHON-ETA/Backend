import { IsDateString, IsString } from 'class-validator';

export class PossibleTimeDto {
  @IsString()
  meetId!: string;

  @IsDateString()
  date!: Date;
}
