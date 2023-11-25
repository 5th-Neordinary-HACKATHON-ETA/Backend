import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { Meeting } from 'src/meetings/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, Meeting])],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
  exports: [],
})
export class AnnouncementsModule {}
