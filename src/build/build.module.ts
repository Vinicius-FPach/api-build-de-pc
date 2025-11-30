import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [PrismaModule],
  controllers: [BuildController],
  providers: [BuildService, RolesGuard, JwtAuthGuard],
})
export class BuildModule {}
