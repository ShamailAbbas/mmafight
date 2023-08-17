import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Fight } from './fight.entity';
import { Fighter } from './fighter.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  location: string;

  @Column({ type: 'date' })
  starting_date: Date;

  @Column({ type: 'date' })
  ending_date: Date;

  @OneToMany(() => Fight, (fight) => fight.event)
  fights: Fight[];

  @ManyToMany(() => Fighter, { cascade: true })
  participants: Fighter[];
}
