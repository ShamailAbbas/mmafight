import { IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFighterDto } from 'src/fighter/dto/createFighterDto';
import { CreateFightDto } from 'src/fight/dto/createFightDto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateResultDto {
  @ApiProperty()
  @IsOptional()
  fight: CreateFightDto;

  @ApiProperty()
  @IsOptional()
  winner: CreateFighterDto;

  @ApiProperty()
  @IsOptional()
  loser: CreateFighterDto;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  isTie: boolean;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  knockout: boolean;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  submission: boolean;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  isEventresult: boolean;

  @ApiProperty()
  @IsOptional()
  runnerUp: CreateFighterDto;

  @ApiProperty()
  @IsOptional()
  thirdPosition: CreateFighterDto;
}

export class UpdateResultDto extends PartialType(CreateResultDto) {}
