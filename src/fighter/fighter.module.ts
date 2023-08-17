import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FighterController } from './fighter.controller';
import { FighterService } from './fighter.service';
import { Fighter } from 'src/entities/fighter.entity';
import { Fight } from 'src/entities/fight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter, Fight])],
  controllers: [FighterController],
  providers: [FighterService],
})
export class FighterModule {}
