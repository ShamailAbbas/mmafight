import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Fight } from './fight.entity';
import { Fighter } from './fighter.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Fight, (fight) => fight.result)
  @JoinColumn()
  fight: Fight;

  @ManyToOne(() => Fighter, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'winner_id', referencedColumnName: 'id' })
  winner: Fighter;

  @ManyToOne(() => Fighter, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'loser_id', referencedColumnName: 'id' })
  loser: Fighter;

  @Column({ default: false })
  isTie: boolean;

  @Column({ default: false })
  knockout: boolean;

  @Column({ default: false })
  submission: boolean;

  @Column({ default: false })
  isEventresult: boolean;

  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'runner_up_id', referencedColumnName: 'id' })
  runnerUp: Fighter;

  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'third_position_id', referencedColumnName: 'id' })
  thirdPosition: Fighter;
}
