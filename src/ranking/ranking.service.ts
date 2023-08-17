import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from 'src/entities/ranking.entity';
import { Repository } from 'typeorm';
import { CreateRankingDto, UpdateRankingDto } from './dto/createRankingDto';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepo: Repository<Ranking>,
  ) {}
  async findAll() {
    return await this.rankingRepo.find({
      //relations: ['fightsAsFighter1', 'fightsAsFighter2', 'Ranking'],
    });
  }
  async findOne(id: number) {
    return await this.rankingRepo.findOne({
      where: { id: id },
      //relations: ['fightsAsFighter1', 'fightsAsFighter2', 'Ranking'],
    });
  }
  async getRankingsByCategory(weightclass: string): Promise<Ranking[]> {
    return this.rankingRepo.find({
      where: { fighter: { personalDetail: { weightclass } } },
      order: { rating: 'DESC' }, // Order by rating in descending order
      relations: ['fighter'],
    });
  }
  async create(createRankingDto: CreateRankingDto) {
    const result = await this.rankingRepo.create(createRankingDto);
    return await this.rankingRepo.save(result);
  }

  async update(
    id: number,
    updateRankingDto: UpdateRankingDto,
  ): Promise<UpdateRankingDto> {
    // await this.resultRepo.update(id, createRankingDto);
    const result = await this.rankingRepo.findOne({ where: { id: id } });
    const u = { ...result, ...updateRankingDto };

    return await this.rankingRepo.save(u);
  }

  async remove(id: number): Promise<void> {
    await this.rankingRepo.delete(id);
  }
}
