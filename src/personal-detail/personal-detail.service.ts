import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalDetail } from 'src/entities/personal-detail.entity';
import { Repository } from 'typeorm';
import {
  CreatePersonalDetailDto,
  UpdatePersonalDetailDto,
} from './dto/createPersonalDetailDto';

@Injectable()
export class PersonalDetailService {
  constructor(
    @InjectRepository(PersonalDetail)
    private readonly personalDetailRepo: Repository<PersonalDetail>,
  ) {}
  async findAll() {
    return await this.personalDetailRepo.find({
      //relations: ['fightsAsFighter1', 'fightsAsFighter2', 'personalDetail'],
    });
  }
  async findOne(id: number) {
    return await this.personalDetailRepo.findOne({
      where: { id: id },
      //relations: ['fightsAsFighter1', 'fightsAsFighter2', 'personalDetail'],
    });
  }

  async create(createPersonalDetailDto: CreatePersonalDetailDto) {
    const result = await this.personalDetailRepo.create(
      createPersonalDetailDto,
    );
    return await this.personalDetailRepo.save(result);
  }

  async update(
    id: number,
    updatePersonalDetailDto: UpdatePersonalDetailDto,
  ): Promise<UpdatePersonalDetailDto> {
    // await this.resultRepo.update(id, createPersonalDetailDto);
    const result = await this.personalDetailRepo.findOne({ where: { id: id } });
    const u = { ...result, ...updatePersonalDetailDto };

    return await this.personalDetailRepo.save(u);
  }

  async remove(id: number): Promise<void> {
    await this.personalDetailRepo.delete(id);
  }
}
