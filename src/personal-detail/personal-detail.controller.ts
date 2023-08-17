import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PersonalDetailService } from './personal-detail.service';
import {
  CreatePersonalDetailDto,
  UpdatePersonalDetailDto,
} from './dto/createPersonalDetailDto';

@Controller('personal-detail')
@ApiTags('Personal Detail')
export class PersonalDetailController {
  constructor(private readonly personalDetailService: PersonalDetailService) {}
  @Get()
  findAll() {
    return this.personalDetailService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personalDetailService.findOne(id);
  }
  @Post()
  create(@Body() personalDetail: CreatePersonalDetailDto) {
    return this.personalDetailService.create(personalDetail);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePersonalDetailDto: UpdatePersonalDetailDto,
  ): Promise<UpdatePersonalDetailDto> {
    return this.personalDetailService.update(id, updatePersonalDetailDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.personalDetailService.remove(id);
  }
}
