import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreateHardwareDto {
  @ApiProperty({ example: 'Intel Core i5-13400' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'CPU' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Intel', required: false })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiProperty({
    example: { cores: 10, threads: 16, boost: '4.6GHz' },
    required: false,
  })
  @IsOptional()
  specs?: any;

  @ApiProperty({ example: 1200.0, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 65 })
  @IsInt()
  wattage: number;
}
