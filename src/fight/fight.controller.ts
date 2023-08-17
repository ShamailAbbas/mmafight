import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { FightService } from './fight.service';
import { CreateFightDto, UpdateFightDto } from './dto/createFightDto';
import { ApiTags } from '@nestjs/swagger';

@Controller('fight')
@ApiTags('Fight')
export class FightController {
  constructor(private readonly fightService: FightService) {}
  @Get()
  findAll() {
    return this.fightService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fightService.findOne(id);
  }
  @Post()
  createFight(@Body() Fight: CreateFightDto) {
    return this.fightService.createFight(Fight);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFightDto: UpdateFightDto,
  ): Promise<UpdateFightDto> {
    return this.fightService.update(id, updateFightDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.fightService.remove(id);
  }
}
