import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  Body,
  HttpCode,
  UseInterceptors,
  UseFilters,
  HttpException,
} from '@nestjs/common';
import { CustomExceptionFilter } from 'src/errors/custom-exception/custom-exception.filter';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryFilterDto } from './dto/query-filter.dto';
import type { User } from './interfaces/user.interface';
import { ResponseInterceptor } from 'src/response/response.interceptor';

@Controller('users')
@UseFilters(CustomExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.create(CreateUserDto);
  }

  @Get()
  findAll() {
    return [{ id: 1, name: 'John Doe' }];
  }

  @Get(':id')
  findOneUser(@Param('id') id: number) {
    if (id !== 1) {
      throw new HttpException('Usuário não encontrado', 404);
    }
    return { id, name: 'John Doe' };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<User>) {
    return this.usersService.update(id, body);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: number, @Body() body: Partial<User>) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    this.usersService.remove(id);
  }
}
