import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Fighter } from './fighter.entity';
import { Event } from './event.entity';
import { Result } from './result.entity';
@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Event, (event) => event.fights, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  event: Event;

  @OneToOne(() => Result, (result) => result.fight, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  result: Result;

  @ManyToOne(() => Fighter, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fighter1_id' })
  fighter1: Fighter;

  @ManyToOne(() => Fighter, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'fighter2_id' })
  fighter2: Fighter;
}
