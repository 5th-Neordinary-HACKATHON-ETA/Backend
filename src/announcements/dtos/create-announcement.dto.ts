import { IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  meetingId!: string;

  @IsString()
  content!: string;
}
