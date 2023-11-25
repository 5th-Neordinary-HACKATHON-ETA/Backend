import { IsString } from 'class-validator';

export class AvailableDto {
  @IsString()
  meetId!: string;
}
