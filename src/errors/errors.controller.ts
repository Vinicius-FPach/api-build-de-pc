import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CustomException } from 'src/errors/custom-exception/custom-exception';

@Controller('errors')
export class ErrorsController {
  @ApiOperation({ summary: 'Dispara uma exceção personalizada' })
  @ApiResponse({ status: 400, description: 'Usuário ' })
  @Get('custom')
  getCustomError() {
    throw new CustomException();
  }

  @ApiOperation({ summary: 'Retorna erro 400 (Bad Request)' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos enviados' })
  @Get('bad-request')
  getBadRequest() {
    throw new BadRequestException('O parâmetro enviado é inválido');
  }

  @ApiOperation({ summary: 'Retorna erro 404 (Not Found)' })
  @ApiResponse({
    status: 404,
    description: 'O recurso solicitado não foi encontrado',
  })
  @Get('not-found')
  getNotFound() {
    throw new NotFoundException('O recurso solicitado não foi encontrado');
  }

  @ApiOperation({ summary: 'Retorna erro 401 (Unauthorized)' })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @Get('unauthorized')
  getUnauthorized() {
    throw new UnauthorizedException('Usuário não autenticado');
  }

  @ApiOperation({ summary: 'Retorna erro 403 (Forbidden)' })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado para o usuário',
  })
  @Get('forbidden')
  getForbidden() {
    throw new ForbiddenException('Acesso negado');
  }

  @ApiOperation({
    summary: 'Dispara diferentes erros dependendo do parâmetro enviado',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Recurso encontrado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'O ID fornecido não é um número válido',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário autenticado, mas sem permissão',
  })
  @ApiResponse({
    status: 404,
    description: 'Recurso não encontrado',
  })
  @Get('test/:id')
  findOne(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new BadRequestException('O ID deve ser um número válido');
    }

    // 2️⃣ Usuário não autenticado (erro 401)
    if (id === '0') {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    // 3️⃣ Usuário autenticado, mas sem permissão (erro 403)
    if (id === '2') {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso',
      );
    }
    if (id !== '1') {
      throw new NotFoundException('Recurso não encontrado');
    }
    return { id, message: 'Recurso encontrado' };
  }
}
