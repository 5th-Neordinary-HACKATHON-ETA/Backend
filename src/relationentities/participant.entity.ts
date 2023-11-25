import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { Team } from '../teams/entities/team.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => User, (user) => user.participants, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: User;

  @ManyToOne((type) => Team, (team) => team.participants, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  team!: Team;
}
