import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHardwareDto } from './dto/create-hardware.dto';
import { UpdateHardwareDto } from './dto/update-hardware.dto';

@Injectable()
export class HardwareService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHardwareDto) {
    return this.prisma.hardware.create({ data });
  }

  async findAll() {
    return this.prisma.hardware.findMany();
  }

  async findOne(id: string) {
    const hardware = await this.prisma.hardware.findUnique({ where: { id } });

    if (!hardware) {
      throw new NotFoundException('Hardware não encontrado');
    }

    return hardware;
  }

  async update(id: string, data: UpdateHardwareDto) {
    await this.findOne(id);

    return this.prisma.hardware.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.hardware.delete({
      where: { id },
    });
  }
}
