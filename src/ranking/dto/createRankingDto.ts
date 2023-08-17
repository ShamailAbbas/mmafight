import { IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateFighterDto } from 'src/fighter/dto/createFighterDto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRankingDto {
  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsOptional()
  fighter: CreateFighterDto;
}

export class UpdateRankingDto extends PartialType(CreateRankingDto) {}
