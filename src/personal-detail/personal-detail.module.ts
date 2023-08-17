import { Module } from '@nestjs/common';
import { PersonalDetailController } from './personal-detail.controller';
import { PersonalDetailService } from './personal-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalDetail } from 'src/entities/personal-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalDetail])],
  controllers: [PersonalDetailController],
  providers: [PersonalDetailService],
})
export class PersonalDetailModule {}
