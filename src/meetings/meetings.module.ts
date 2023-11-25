import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { Participant } from '../relationentities/participant.entity';
import { Possible_Time } from '../relationentities/possible_time.entity';
import { Team } from '../teams/entities/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting, Participant, Possible_Time, Team]),
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService],
  exports: [],
})
export class MeetingsModule {}
