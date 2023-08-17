import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

import { CreateEventDto } from 'src/event/dto/createEventDto';
import { CreateFighterDto } from 'src/fighter/dto/createFighterDto';

export class CreateFightDto {
  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsOptional()
  event: CreateEventDto;

  @ApiProperty()
  @IsOptional()
  fighter1: CreateFighterDto;

  @ApiProperty()
  @IsOptional()
  fighter2: CreateFighterDto;
}

export class UpdateFightDto extends PartialType(CreateFightDto) {}
