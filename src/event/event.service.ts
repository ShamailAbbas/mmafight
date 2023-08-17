import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './dto/createEventDto';
import { Fighter } from 'src/entities/fighter.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly event: Repository<Event>,
  ) {}
  async findAll() {
    return await this.event.find({
      relations: ['fights', 'fights.result'],
    });
  }
  async findOne(id: number) {
    return await this.event.findOne({ where: { id: id } });
  }
  async getParticipants(id: number): Promise<any> {
    return await this.event.findOne({
      where: { id: id },
      relations: ['participants'],
    });
  }
  async createEvent(createEventDto: CreateEventDto) {
    const event = await this.event.create(createEventDto);
    return await this.event.save(event);
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<UpdateEventDto> {
    const current_event = await this.event.findOne({
      where: { id: id },
    });
    const updatedEvent = { ...current_event, ...updateEventDto };
    return await this.event.save(updatedEvent);
  }

  async remove(id: number) {
    const result: any = await this.event.delete(id);
    return {
      status: 'ok',
      messsage: 'Data deleted successfully',
      totalData: result && result.length ? result.length : 0,
      result: result,
    };
  }
}
