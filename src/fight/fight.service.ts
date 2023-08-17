import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from 'src/entities/fight.entity';
import { Repository } from 'typeorm';
import { CreateFightDto, UpdateFightDto } from './dto/createFightDto';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight)
    private readonly fight: Repository<Fight>,
  ) {}
  async findAll() {
    return await this.fight.find({
      relations: [
        'result.winner',
        'result.loser',
        'fighter1',
        'fighter2',
        'event',
      ],
    });
  }
  async findOne(id: number) {
    return await this.fight.findOne({
      where: { id: id },
      relations: [
        'result.winner',
        'result.loser',
        'fighter1',
        'fighter2',
        'event',
      ],
    });
  }
  async createFight(createFightDto: CreateFightDto) {
    const fight = await this.fight.create(createFightDto);
    return await this.fight.save(fight);
  }

  async update(
    id: number,
    updateFightDto: UpdateFightDto,
  ): Promise<UpdateFightDto> {
    await this.fight.update(id, updateFightDto);
    const current_fight = await this.fight.findOne({
      where: { id: id },
    });

    return current_fight;
  }

  async remove(id: number): Promise<void> {
    await this.fight.delete(id);
  }
}
