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
import { CustomException } from 'src/errors/custom-exception/custom-exception';

@Controller('errors')
export class ErrorsController {
  @Get('custom')
  getCustomError() {
    throw new CustomException();
  }

  @Get('bad-request')
  getBadRequest() {
    throw new BadRequestException('O parâmetro enviado é inválido');
  }

  @Get('not-found')
  getNotFound() {
    throw new NotFoundException('O recurso solicitado não foi encontrado');
  }

  @Get('unauthorized')
  getUnauthorized() {
    throw new UnauthorizedException('Usuário não autenticado');
  }

  @Get('forbidden')
  getForbidden() {
    throw new ForbiddenException('Acesso negado');
  }

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
