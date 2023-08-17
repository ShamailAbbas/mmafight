import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FighterModule } from './fighter/fighter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightModule } from './fight/fight.module';
import { EventModule } from './event/event.module';
import { ResultModule } from './result/result.module';
import { PersonalDetailModule } from './personal-detail/personal-detail.module';
import { RankingModule } from './ranking/ranking.module';
import config from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    FighterModule,
    FightModule,
    EventModule,
    ResultModule,
    PersonalDetailModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
