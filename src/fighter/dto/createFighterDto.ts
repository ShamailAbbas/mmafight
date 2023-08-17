import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
export class CreateFighterDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateFighterDto extends PartialType(CreateFighterDto) {}

export class FighterStats {
  wins: number;
  losses: number;
  ties: number;
  knockouts: number;
  submissions: number;
}
