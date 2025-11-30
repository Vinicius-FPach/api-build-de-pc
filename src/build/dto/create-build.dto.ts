import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateBuildDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da montagem (ex: PC Gamer 2025)' })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Potência de PSU sugerida em Watts.',
    required: false,
  })
  sugPsu?: number;
}
