import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Fight } from './fight.entity';
import { Event } from './event.entity';
import { PersonalDetail } from './personal-detail.entity';
import { Ranking } from './ranking.entity';
@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => PersonalDetail, (personalDetail) => personalDetail.fighter, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  personalDetail: PersonalDetail;

  @OneToOne(() => Ranking, (ranking) => ranking.fighter)
  ranking: Ranking;

  @OneToMany(() => Fight, (fight) => fight.fighter1)
  fightsAsFighter1: Fight[];

  @OneToMany(() => Fight, (fight) => fight.fighter2)
  fightsAsFighter2: Fight[];

  @ManyToMany(() => Event, (event) => event.participants)
  @JoinTable()
  events: Event[];
}
