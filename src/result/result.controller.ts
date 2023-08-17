import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultService } from './result.service';
import { CreateResultDto, UpdateResultDto } from './dto/createResultDto';

@Controller('result')
@ApiTags('Result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}
  @Get()
  findAll() {
    return this.resultService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resultService.findOne(id);
  }
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateResultDto: UpdateResultDto,
  ): Promise<UpdateResultDto> {
    return this.resultService.update(id, updateResultDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.resultService.remove(id);
  }
}
