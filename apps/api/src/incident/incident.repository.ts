import { Injectable } from '@nestjs/common';
import { Incident, IncidentType, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class IncidentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createIncident(
    title: string,
    description: string,
    type: IncidentType,
    creatorId: string,
    userRole: UserRole
  ) {
    let incident: Incident;

    if (userRole === UserRole.ADMIN) {
      incident = await this.prisma.incident.create({
        data: {
          title: title,
          description: description,
          type: type,
          creator_id: creatorId,
        },
      });
    }

    return incident;
  }

  async findIncidents(userRole: UserRole, userId: string, searchText?: string) {
    let incidents: Incident[];

    if (userRole === UserRole.ADMIN) {
      incidents = await this.prisma.incident.findMany({
        where: {
          creator_id: userId,
          ...(searchText && {
            OR: [
              {
                title: {
                  contains: searchText,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: searchText,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
        include: {
          creator: true,
          assignee: true,
        },
      });
    } else if (userRole === UserRole.NORMAL_USER) {
      incidents = await this.prisma.incident.findMany({
        where: {
          assignee_id: userId,
          ...(searchText && {
            OR: [
              {
                title: {
                  contains: searchText,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: searchText,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
        include: {
          creator: true,
          assignee: true,
        },
      });
    }

    return incidents;
  }

  async findIncident(id: string) {
    const incident = await this.prisma.incident.findUnique({
      where: {
        id: id,
      },
      include: {
        creator: true,
        assignee: true,
      },
    });
    return incident;
  }

  async deleteIncidentById(id: string) {
    const incident = await this.prisma.incident.delete({
      where: {
        id: id,
      },
      include: {
        creator: true,
        assignee: true,
      },
    });
    return incident;
  }
}
