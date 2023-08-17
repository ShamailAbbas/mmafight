import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  CreateFighterDto,
  FighterStats,
  UpdateFighterDto,
} from './dto/createFighterDto';
import { FighterService } from './fighter.service';
import { ApiTags } from '@nestjs/swagger';
import { Fight } from 'src/entities/fight.entity';

@Controller('fighter')
@ApiTags('Fighter')
export class FighterController {
  constructor(private readonly fighterService: FighterService) {}
  @Get()
  findAll() {
    return this.fighterService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fighterService.findOne(id);
  }
  @Get(':id/stats')
  async getFighterStats(@Param('id') id: number): Promise<FighterStats> {
    return this.fighterService.getFighterStats(id);
  }
  @Get(':id/upcoming-fights')
  async getUpcomingFights(@Param('id') id: number): Promise<Fight[]> {
    return this.fighterService.getUpcomingFightsForFighter(id);
  }
  @Post()
  createFighter(@Body() Fighter: CreateFighterDto) {
    return this.fighterService.createFighter(Fighter);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFighterDto: UpdateFighterDto,
  ): Promise<UpdateFighterDto> {
    return this.fighterService.update(id, updateFighterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.fighterService.remove(id);
  }
}
