import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBuildDto } from './dto/create-build.dto';
import { AddHardwareDto } from './dto/add-hardware.dto';
import { Role } from '@prisma/client';

@Injectable()
export class BuildService {
  constructor(private prisma: PrismaService) {}

  private buildInclude = {
    hardware: {
      select: {
        hardware: true,
      },
    },
    user: {
      select: {
        id: true,
        email: true,
        name: true,
      },
    },
  };

  private async calculatePsu(buildId: string): Promise<number> {
    const hardwareList = await this.prisma.buildHardware.findMany({
      where: { buildId },
      select: {
        hardware: {
          select: { wattage: true },
        },
      },
    });

    const baseWattage = hardwareList.reduce(
      (sum, item) => sum + item.hardware.wattage,
      0,
    );

    const suggestedPsu = Math.ceil(baseWattage * 1.1);

    return suggestedPsu;
  }

  private async updatePsu(buildId: string): Promise<void> {
    const suggestedPsu = await this.calculatePsu(buildId);

    await this.prisma.build.update({
      where: { id: buildId },
      data: { sugPsu: suggestedPsu },
    });
  }

  async create(userId: number, data: CreateBuildDto) {
    return this.prisma.build.create({
      data: {
        name: data.name,
        sugPsu: data.sugPsu || 0,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: this.buildInclude,
    });
  }

  async findAllByUser(userId: number, isAdmin: boolean) {
    const where = isAdmin ? {} : { userId };

    const builds = await this.prisma.build.findMany({
      where,
      include: this.buildInclude,
      orderBy: { createdAt: 'desc' },
    });

    return builds.map((build) => ({
      ...build,
      hardware: build.hardware.map((bh) => bh.hardware),
    }));
  }

  async findOne(id: string, userId: number, isAdmin: boolean) {
    const build = await this.prisma.build.findUnique({
      where: { id },
      include: this.buildInclude,
    });

    if (!build) {
      throw new NotFoundException(`Montagem com ID '${id}' não encontrada.`);
    }

    if (!isAdmin && build.userId !== userId) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar esta montagem.',
      );
    }

    return {
      ...build,
      hardware: build.hardware.map((bh) => bh.hardware),
    };
  }

  async addHardware(
    buildId: string,
    userId: number,
    isAdmin: boolean,
    dto: AddHardwareDto,
  ) {
    await this.checkPermission(buildId, userId, isAdmin, 'modificar');

    const { hardwareId } = dto;
    const hardwareExists = await this.prisma.hardware.findUnique({
      where: { id: hardwareId },
    });
    if (!hardwareExists) {
      throw new NotFoundException(
        `Hardware com ID '${hardwareId}' não encontrado.`,
      );
    }

    const existingEntry = await this.prisma.buildHardware.findUnique({
      where: {
        buildId_hardwareId: {
          buildId,
          hardwareId,
        },
      },
    });

    if (existingEntry) {
      throw new ConflictException(
        'Este hardware já está associado a esta montagem.',
      );
    }

    const newAssociation = await this.prisma.buildHardware.create({
      data: { buildId, hardwareId },
      include: { hardware: true },
    });

    await this.updatePsu(buildId);

    return newAssociation;
  }

  async removeHardware(
    buildId: string,
    hardwareId: string,
    userId: number,
    isAdmin: boolean,
  ) {
    await this.checkPermission(buildId, userId, isAdmin, 'modificar');

    try {
      const deletedEntry = await this.prisma.buildHardware.delete({
        where: {
          buildId_hardwareId: {
            buildId,
            hardwareId,
          },
        },
      });

      await this.updatePsu(buildId);

      return deletedEntry;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'Associação de Hardware/Montagem não encontrada.',
        );
      }
      throw error;
    }
  }

  async removeBuild(id: string, userId: number, isAdmin: boolean) {
    await this.checkPermission(id, userId, isAdmin, 'deletar');

    try {
      return await this.prisma.build.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Montagem com ID '${id}' não encontrada.`);
      }
      throw error;
    }
  }

  private async checkPermission(
    buildId: string,
    userId: number,
    isAdmin: boolean,
    operation: string,
  ) {
    const build = await this.prisma.build.findUnique({
      where: { id: buildId },
    });

    if (!build) {
      throw new NotFoundException(
        `Montagem com ID '${buildId}' não encontrada.`,
      );
    }

    if (!isAdmin && build.userId !== userId) {
      throw new UnauthorizedException(
        `Você não tem permissão para ${operation} esta montagem.`,
      );
    }
  }
}
