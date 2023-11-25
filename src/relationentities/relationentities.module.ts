import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { Possible_Time } from './possible_time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Possible_Time])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RelationentitiesModule {}
