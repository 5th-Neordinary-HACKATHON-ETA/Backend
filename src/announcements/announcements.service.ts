import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { User } from 'src/users/entities/users.entity';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { Repository } from 'typeorm';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Exception } from 'src/common/response/exception';
import { RESPONSE_CODE } from 'src/common/response/response.code';
import { Participant } from 'src/relationentities/participant.entity';
import { Team } from 'src/teams/entities/team.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
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

  async getAnnouncements(user: User): Promise<
    {
      teamName: string;
      title: string | null;
      nickname: string | null;
    }[]
  > {
    const participants: Participant[] = await this.participantRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['team'],
    });
    const teams: Team[] = participants.map(
      (participant: Participant) => participant.team,
    );
    const subQuery = this.meetingRepository
      .createQueryBuilder('meeting')
      .select('MAX(meeting.dateTime)', 'maxDateTime')
      .addSelect('meeting.teamId')
      .groupBy('meeting.teamId');

    const queryBuilder = this.meetingRepository
      .createQueryBuilder('meeting')
      .innerJoin(
        '(' + subQuery.getQuery() + ')',
        'maxDate',
        'meeting.dateTime = maxDate.maxDateTime AND meeting.teamId = maxDate.teamId',
      )
      .leftJoin(Team, 'team', 'meeting.teamId = team.id')
      .where('team.id IN (:...teams)', { teams: teams.map((team) => team.id) })
      .leftJoin(
        Announcement,
        'announcement',
        'meeting.announcementId = announcement.id',
      )
      .leftJoin(User, 'user', 'user.id = announcement.writer')
      .select([
        'team.name as teamName',
        'announcement.title as title',
        'user.nickname as nickname',
      ]);

    return await queryBuilder.getRawMany();
  }
}
