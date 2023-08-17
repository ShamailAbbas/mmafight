import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FightController } from './fight.controller';
import { FightService } from './fight.service';
import { Fight } from 'src/entities/fight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight])],
  controllers: [FightController],
  providers: [FightService],
})
export class FightModule {}
