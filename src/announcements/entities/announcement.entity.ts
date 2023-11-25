import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { User } from '../../users/entities/users.entity';
import { Meeting } from '../../meetings/entities/meeting.entity';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => User, (user) => user.announcements, {
    onDelete: 'SET NULL',
  })
  writer!: User;

  @OneToOne((type) => Meeting, (meeting) => meeting.announcement)
  @JoinColumn()
  meeting!: Meeting;

  @Column()
  @IsString()
  title!: string;

  @Column()
  @IsString()
  content!: string;
}
