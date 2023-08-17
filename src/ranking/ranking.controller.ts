import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { CreateRankingDto, UpdateRankingDto } from './dto/createRankingDto';
import { Ranking } from 'src/entities/ranking.entity';

@Controller('ranking')
@ApiTags('Ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}
  //   @Get()
  //   findAll() {
  //     return this.rankingService.findAll();
  //   }
  //   @Get(':id')
  //   findOne(@Param('id') id: number) {
  //     return this.rankingService.findOne(id);
  //   }

  @Get()
  async getRankingsByCategory(
    @Query('weightclass') weightclass: string,
  ): Promise<Ranking[]> {
    return this.rankingService.getRankingsByCategory(weightclass);
  }
  @Post()
  create(@Body() craeteRankingDto: CreateRankingDto) {
    return this.rankingService.create(craeteRankingDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRankingDto: UpdateRankingDto,
  ): Promise<UpdateRankingDto> {
    return this.rankingService.update(id, updateRankingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.rankingService.remove(id);
  }
}
