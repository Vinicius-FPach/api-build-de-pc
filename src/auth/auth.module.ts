// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // (criaremos em breve)
import { PrismaService } from 'src/prisma/prisma.service'; // ajuste o path conforme seu projeto

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configura Passport com estratégia padrão JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minha_chave_secreta', // chave de assinatura do token
      signOptions: { expiresIn: '1d' }, // token expira em 1 hora (ajuste conforme necessário)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService], // exporta AuthService se precisar usar em outros módulos
})
export class AuthModule {}
