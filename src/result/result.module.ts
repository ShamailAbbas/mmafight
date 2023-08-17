import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { Result } from 'src/entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from 'src/entities/ranking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Ranking])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
