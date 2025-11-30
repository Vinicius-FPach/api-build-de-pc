import { Module } from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { HardwareController } from './hardware.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [HardwareController],
  providers: [HardwareService, RolesGuard],
})
export class HardwareModule {}
