import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto/createEventDto';
import { ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  findAll() {
    return this.eventService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(id);
  }
  @Post()
  createFight(@Body() event: CreateEventDto) {
    return this.eventService.createEvent(event);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<UpdateEventDto> {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.eventService.remove(id);
  }
}
