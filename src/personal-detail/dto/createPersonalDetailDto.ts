import { IsString, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateFighterDto } from 'src/fighter/dto/createFighterDto';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePersonalDetailDto {
  @ApiProperty()
  @IsString()
  weightclass: string;

  @ApiProperty()
  @IsString()
  nationality: string;
  @ApiProperty()
  @IsNumber()
  height: number;
  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsOptional()
  fighter: CreateFighterDto;
}

export class UpdatePersonalDetailDto extends PartialType(
  CreatePersonalDetailDto,
) {}
