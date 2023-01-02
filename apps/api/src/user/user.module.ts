import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma.service';
import { AuthorizeMiddleware } from '../authorize.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizeMiddleware)
      .exclude(
        { path: '/api/users/signup', method: RequestMethod.POST },
        { path: '/api/users/login', method: RequestMethod.POST }
      )
      .forRoutes('users');
  }
}
