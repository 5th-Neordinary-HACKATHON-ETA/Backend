import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Announcement } from '../../announcements/entities/announcement.entity';
import { Possible_Time } from '../../relationentities/possible_time.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @IsString()
  name!: string;

  @Column({ nullable: true })
  @IsDateString()
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

  @OneToMany((type) => Possible_Time, (possibleTime) => possibleTime.meeting)
  possibleTimes?: Possible_Time[];

  @ManyToOne((type) => Team, (team) => team.meetings)
  team!: Team;
}
