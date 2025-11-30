import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddHardwareDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do Hardware a ser adicionado à montagem.' })
  hardwareId: string;
}
