import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { Meeting } from '../meetings/entities/meeting.entity';

@Entity()
export class Possible_Time {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => User, (user) => user.possibleTimes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne((type) => Meeting, (meeting) => meeting.possibleTimes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  meeting!: Meeting;

  @Column()
  possibleTime!: Date;
}
