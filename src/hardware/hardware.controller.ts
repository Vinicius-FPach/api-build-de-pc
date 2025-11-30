import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { CreateHardwareDto } from './dto/create-hardware.dto';
import { UpdateHardwareDto } from './dto/update-hardware.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('hardware')
@Controller('hardware')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria um novo hardware (ADMIN)' })
  @ApiResponse({ status: 201, description: 'Hardware criado com sucesso' })
  create(@Body() dto: CreateHardwareDto) {
    return this.hardwareService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um hardware pelo ID (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Hardware atualizado com sucesso' })
  update(@Param('id') id: string, @Body() dto: UpdateHardwareDto) {
    return this.hardwareService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta um hardware pelo ID (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Hardware deletado com sucesso' })
  remove(@Param('id') id: string) {
    return this.hardwareService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os hardwares (PÚBLICO)' })
  findAll() {
    return this.hardwareService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém hardware por ID (PÚBLICO)' })
  findOne(@Param('id') id: string) {
    return this.hardwareService.findOne(id);
  }
}
