import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { User } from 'src/users/entities/users.entity';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { Repository } from 'typeorm';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Exception } from 'src/common/response/exception';
import { RESPONSE_CODE } from 'src/common/response/response.code';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) {}

  async createAnnouncement(
    user: User,
    createAnnouncementDto: CreateAnnouncementDto,
  ) {
    const meeting = await this.meetingRepository.findOne({
      where: { id: createAnnouncementDto.meetingId },
      relations: ['announcement'],
    });

    if (meeting === null) {
      throw new Exception(RESPONSE_CODE[34040], null);
    }

    if (meeting.announcement !== null) {
      throw new Exception(RESPONSE_CODE[44090], null);
    }

    const announcement = new Announcement();
    announcement.writer = user;
    announcement.content = createAnnouncementDto.content;
    announcement.title = createAnnouncementDto.title;
    announcement.meeting = meeting;
    await this.announcementRepository.save(announcement);
    meeting.announcement = announcement;
    await this.meetingRepository.save(meeting);
  }
}
