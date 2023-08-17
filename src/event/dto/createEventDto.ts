import {
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Fighter } from 'src/entities/fighter.entity';
export class CreateEventDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  starting_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  ending_date: Date;

  @ApiProperty()
  @IsOptional()
  participants: Fighter[];
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
