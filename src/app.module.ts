import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { ErrorsModule } from './errors/errors.module';

@Module({
  imports: [SharedModule, CoreModule, UsersModule, ErrorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
