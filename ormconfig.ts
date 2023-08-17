import { Event } from 'src/entities/event.entity';
import { Fight } from 'src/entities/fight.entity';
import { Fighter } from 'src/entities/fighter.entity';
import { PersonalDetail } from 'src/entities/personal-detail.entity';
import { Ranking } from 'src/entities/ranking.entity';
import { Result } from 'src/entities/result.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import * as dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: process.env.DB_TYPE as 'postgres', // Using 'as' assertion to inform TypeScript about the type
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Fighter, Fight, Event, Result, PersonalDetail, Ranking],
  synchronize: process.env.ENVIRONMENT == 'dev' ? true : false,
};

export default config;
