import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/entities/result.entity';
import { Repository } from 'typeorm';
import { CreateResultDto, UpdateResultDto } from './dto/createResultDto';
import { Ranking } from 'src/entities/ranking.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepo: Repository<Result>,
    @InjectRepository(Ranking) private rankingRepository: Repository<Ranking>,
  ) {}

  async findAll() {
    return await this.resultRepo.find({
      //relations: ['fightsAsFighter1', 'fightsAsFighter2', 'personalDetail'],
    });
  }
  async findOne(id: number) {
    return await this.resultRepo.findOne({
      where: { id: id },
      //relations: ['fightsAsFighter1', 'fightsAsFighter2', 'personalDetail'],
    });
  }
  async create(createResultDto: CreateResultDto) {
    const result = await this.resultRepo.create(createResultDto);
    await this.resultRepo.save(result);

    await this.updateRankings(result);

    return result;
  }

  async updateRankings(result: Result) {
    const winnerRanking = await this.rankingRepository.findOne({
      where: { fighter: result.winner },
    });
    const loserRanking = await this.rankingRepository.findOne({
      where: { fighter: result.loser },
    });

    if (winnerRanking && loserRanking) {
      // Update ratings based on the rules
      winnerRanking.rating += 10;
      loserRanking.rating -= 10;

      // Save the updated rankings
      await this.rankingRepository.save([winnerRanking, loserRanking]);
    }
  }

  async update(
    id: number,
    updateResultDto: UpdateResultDto,
  ): Promise<UpdateResultDto> {
    // await this.resultRepo.update(id, createResultDto);
    const result = await this.resultRepo.findOne({ where: { id: id } });
    const u = { ...result, ...updateResultDto };

    return await this.resultRepo.save(u);
  }

  async remove(id: number): Promise<void> {
    await this.resultRepo.delete(id);
  }
}
