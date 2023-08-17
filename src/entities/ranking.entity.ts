import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Fighter } from './fighter.entity';

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Fighter, (fighter) => fighter.ranking, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  fighter: Fighter;

  @Column({ nullable: false })
  rating: number;
}
