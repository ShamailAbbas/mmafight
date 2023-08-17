import {
  CreateFighterDto,
  FighterStats,
  UpdateFighterDto,
} from './dto/createFighterDto';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from 'src/entities/fighter.entity';
import { Fight } from 'src/entities/fight.entity';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepo: Repository<Fighter>,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}
  async getUpcomingFightsForFighter(id: number): Promise<Fight[]> {
    const fighter = await this.fighterRepo.findOne({ where: { id } });

    if (!fighter) {
      throw new NotFoundException('Fighter not found');
    }

    const fights = await this.fightRepository.find({
      where: [{ fighter1: fighter }, { fighter2: fighter }],
    });
    const currentDate = new Date();
    const upcomingFights = fights?.filter(
      (fight) => new Date(fight.date) > currentDate,
    );

    return upcomingFights;
  }
  async getFighterStats(id: number): Promise<FighterStats> {
    const fighter = await this.fighterRepo.findOne({ where: { id } });

    if (!fighter) {
      throw new NotFoundException('Fighter not found');
    }

    const fights = await this.fightRepository.find({
      where: [{ fighter1: fighter }, { fighter2: fighter }],
      relations: ['result.winner', 'result.loser'],
    });

    const wins = fights.filter(
      (fight) => fight.result && fight.result.winner.id === fighter.id,
    ).length;

    const losses = fights.filter(
      (fight) => fight.result && fight.result.loser.id === fighter.id,
    ).length;

    const ties = fights.filter(
      (fight) => fight.result && fight.result.isTie,
    ).length;

    const knockouts = fights.filter(
      (fight) =>
        fight.result &&
        fight.result.winner.id === fighter.id &&
        fight.result.knockout,
    ).length;

    const submissions = fights.filter(
      (fight) =>
        fight.result &&
        fight.result.winner.id === fighter.id &&
        fight.result.submission,
    ).length;

    return {
      wins,
      losses,
      ties,
      knockouts,
      submissions,
    };
  }
  async findAll() {
    return await this.fighterRepo.find({
      relations: [
        'fightsAsFighter1.result',
        'fightsAsFighter2.result',
        'personalDetail',
        'ranking',
      ],
    });
  }
  async findOne(id: number) {
    return await this.fighterRepo.findOne({
      where: { id: id },
      relations: [
        'fightsAsFighter1',
        'fightsAsFighter2',
        'personalDetail',
        'ranking',
      ],
    });
  }
  async createFighter(createFighterDto: CreateFighterDto) {
    const fighter = await this.fighterRepo.create(createFighterDto);
    return await this.fighterRepo.save(fighter);
  }

  async update(
    id: number,
    updateFighterDto: UpdateFighterDto,
  ): Promise<UpdateFighterDto> {
    // await this.fighterRepo.update(id, createFighterDto);
    const fighter = await this.fighterRepo.findOne({ where: { id: id } });
    if (!fighter) {
      throw new NotFoundException('Fighter not found');
    }
    const u = { ...fighter, ...updateFighterDto };

    return await this.fighterRepo.save(u);
  }

  async remove(id: number): Promise<void> {
    await this.fighterRepo.delete(id);
  }
}
