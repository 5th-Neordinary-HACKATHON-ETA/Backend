import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Participant } from '../../relationentities/participant.entity';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  boss!: User;

  @Column()
  @IsString()
  name!: string;

  @Column()
  @IsNumber()
  maxMember!: number;

  @Column()
  @IsDate()
  startedAt!: Date;

  @Column()
  @IsDate()
  endedAt!: Date;

  @OneToMany((type) => Participant, (participant) => participant, {
    nullable: true,
  })
  participants: Participant[];
}
