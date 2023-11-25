import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { JwtAuthGuard } from 'src/common/decorator/auth/jwt/jwt.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/users.entity';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { ResponseBody, SuccessResponse } from 'src/common/response/response';
import { RESPONSE_CODE } from 'src/common/response/response.code';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAnnouncement(
    @AuthUser() user: User,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<ResponseBody> {
    await this.announcementsService.createAnnouncement(
      user,
      createAnnouncementDto,
    );
    return SuccessResponse(RESPONSE_CODE[2000], null);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAnnouncements(@AuthUser() user: User): Promise<ResponseBody> {
    const announcements =
      await this.announcementsService.getAnnouncements(user);
    return SuccessResponse(RESPONSE_CODE[2000], {
      announcements,
    });
  }
}
