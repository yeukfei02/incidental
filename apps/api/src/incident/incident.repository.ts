import { Injectable } from '@nestjs/common';
import { Incident, IncidentType, UserRole, Status } from '@prisma/client';
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

  async findIncidents(
    userRole: UserRole,
    userId: string,
    searchText?: string,
    page?: string,
    perPage?: string
  ) {
    const pageInt = page ? parseInt(page, 10) : 1;
    const perPageInt = perPage ? parseInt(perPage, 10) : 10;

    const incidents = await this.prisma.incident.findMany({
      where: {
        ...(userRole === UserRole.ADMIN && {
          creator_id: userId,
        }),
        ...(userRole === UserRole.NORMAL_USER && {
          assignee_id: userId,
        }),
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
      orderBy: {
        created_at: 'desc',
      },
      skip: pageInt > 1 ? pageInt * perPageInt - perPageInt : 0,
      take: perPageInt,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });

    return incidents;
  }

  async findAllIncidentsByUserRoleAndUserId(
    userRole: UserRole,
    userId: string
  ) {
    const allIncidents = await this.prisma.incident.findMany({
      where: {
        ...(userRole === UserRole.ADMIN && {
          creator_id: userId,
        }),
        ...(userRole === UserRole.NORMAL_USER && {
          assignee_id: userId,
        }),
      },
    });
    return allIncidents;
  }

  async findIncidentById(id: string) {
    const incident = await this.prisma.incident.findUnique({
      where: {
        id: id,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }

  async assignIncident(id: string, assigneeId: string) {
    const incident = await this.prisma.incident.update({
      where: {
        id: id,
      },
      data: {
        assignee_id: assigneeId,
        status: Status.ASSIGNED,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }

  async updateIncidentStatus(id: string, status: Status) {
    const incident = await this.prisma.incident.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
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
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true,
            userRoles: true,
          },
        },
      },
    });
    return incident;
  }
}
