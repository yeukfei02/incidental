import { Module, MiddlewareConsumer } from '@nestjs/common';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { IncidentRepository } from './incident.repository';
import { PrismaService } from './../prisma.service';
import { AuthorizeMiddleware } from './../authorize.middleware';

@Module({
  controllers: [IncidentController],
  providers: [IncidentService, IncidentRepository, PrismaService],
})
export class IncidentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizeMiddleware).forRoutes('incidents');
  }
}
