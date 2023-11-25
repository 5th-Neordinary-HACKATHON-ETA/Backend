import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { CreateDto } from './dtos/request/create.dto';
import { ResponseBody, SuccessResponse } from '../common/response/response';
import { RESPONSE_CODE } from '../common/response/response.code';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
  ) {}

  async create(createDto: CreateDto): Promise<ResponseBody> {
    const meetingInDto: Meeting = this.meetingsRepository.create(createDto);
    await this.meetingsRepository.save(meetingInDto);
    return SuccessResponse(RESPONSE_CODE[2000], { id: meetingInDto.id });
  }
}
