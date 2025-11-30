import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { BuildService } from './build.service';
import { CreateBuildDto } from './dto/create-build.dto';
import { AddHardwareDto } from './dto/add-hardware.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user: {
    userId?: number;
    id?: number;
    sub?: number;
    email: string;
    roles: Role;
  };
}

@ApiTags('builds')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('builds')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  private getAuthInfo(req: AuthenticatedRequest) {
    if (!req.user) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    const rawId = req.user.userId || req.user.id || req.user.sub;

    const userId = Number(rawId);

    if (isNaN(userId) || userId <= 0) {
      throw new ForbiddenException(
        'Acesso negado: ID do usuário inválido ou ausente no token.',
      );
    }

    const userRoles = Array.isArray(req.user.roles)
      ? req.user.roles
      : [req.user.roles];
    return {
      userId,
      isAdmin: userRoles.includes('ADMIN'),
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Cria uma nova montagem de PC para o usuário logado',
  })
  @ApiResponse({ status: 201, description: 'Montagem criada com sucesso' })
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createBuildDto: CreateBuildDto,
  ) {
    const { userId } = this.getAuthInfo(req);
    return this.buildService.create(userId, createBuildDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista montagens: Todas (Admin) ou Somente do Usuário (User)',
  })
  findAll(@Req() req: AuthenticatedRequest) {
    const { userId, isAdmin } = this.getAuthInfo(req);
    return this.buildService.findAllByUser(userId, isAdmin);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca os detalhes de uma montagem por ID' })
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const { userId, isAdmin } = this.getAuthInfo(req);
    return this.buildService.findOne(id, userId, isAdmin);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deleta uma montagem de PC (apenas o dono ou Admin)',
  })
  @ApiResponse({ status: 204, description: 'Montagem deletada com sucesso' })
  removeBuild(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const { userId, isAdmin } = this.getAuthInfo(req);
    return this.buildService.removeBuild(id, userId, isAdmin);
  }

  @Post(':buildId/hardware')
  @ApiOperation({
    summary:
      'Adiciona um hardware à montagem especificada (apenas o dono ou Admin)',
  })
  @ApiResponse({ status: 201, description: 'Hardware associado com sucesso' })
  addHardware(
    @Req() req: AuthenticatedRequest,
    @Param('buildId') buildId: string,
    @Body() addHardwareDto: AddHardwareDto,
  ) {
    const { userId, isAdmin } = this.getAuthInfo(req);
    return this.buildService.addHardware(
      buildId,
      userId,
      isAdmin,
      addHardwareDto,
    );
  }

  @Delete(':buildId/hardware/:hardwareId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove um hardware da montagem (apenas o dono ou Admin)',
  })
  @ApiResponse({
    status: 204,
    description: 'Hardware removido da montagem com sucesso',
  })
  removeHardware(
    @Req() req: AuthenticatedRequest,
    @Param('buildId') buildId: string,
    @Param('hardwareId') hardwareId: string,
  ) {
    const { userId, isAdmin } = this.getAuthInfo(req);
    return this.buildService.removeHardware(
      buildId,
      hardwareId,
      userId,
      isAdmin,
    );
  }
}
