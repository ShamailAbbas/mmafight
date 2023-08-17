import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Fighter } from './fighter.entity';
@Entity()
export class PersonalDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  weightclass: string;

  @Column({ nullable: false })
  nationality: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  height: number;

  @OneToOne(() => Fighter, (fighter) => fighter.personalDetail)
  @JoinColumn()
  fighter: Fighter;
}
