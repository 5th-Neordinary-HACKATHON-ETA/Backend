import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { IsString } from 'class-validator';
import { Participant } from '../../relationentities/participant.entity';
import { Announcement } from '../../announcements/entities/announcement.entity';
import { Possible_Time } from '../../relationentities/possible_time.entity';

@Entity()
@Unique(['nickname'])
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  @IsString()
  nickname!: string;

  @Column({ select: false })
  @IsString()
  //@Matches(/^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
  //  message:
  //    'Password must be at least 8 characters(en) long, contain 1 number',
  //})
  password!: string;

  @OneToMany((type) => Participant, (participant) => participant, {
    nullable: true,
  })
  participants: Participant[];

  @OneToMany((type) => Announcement, (announcement) => announcement.writer)
  announcements: Announcement[];

  @OneToMany((type) => Possible_Time, (possibleTime) => possibleTime)
  possibleTimes: Possible_Time[];
}
