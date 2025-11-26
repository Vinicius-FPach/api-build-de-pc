import { Module } from '@nestjs/common';
import { AdminController } from './admins.controller';
import { AdminsService } from './admins.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminController],
  providers: [AdminsService, PrismaService],
})
export class AdminsModule {}
