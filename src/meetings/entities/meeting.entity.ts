import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Announcement } from '../../announcements/entities/announcement.entity';
import { Possible_Time } from '../../relationentities/possible_time.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @IsString()
  name!: string;

  @Column()
  @IsDate()
  dateTime?: Date;

  @Column()
  @IsNumber()
  duration!: number;

  @Column()
  @IsString()
  location?: string;

  @OneToOne((type) => Announcement, (announcement) => announcement.meeting)
  @JoinColumn()
  announcement?: Announcement;

  @OneToMany((type) => Possible_Time, (possibleTime) => possibleTime)
  possibleTimes?: Possible_Time[];
}
