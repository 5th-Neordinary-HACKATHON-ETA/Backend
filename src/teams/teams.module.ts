import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Participant } from '../relationentities/participant.entity';
import { Meeting } from '../meetings/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Participant, Meeting])],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [],
})
export class TeamsModule {}
