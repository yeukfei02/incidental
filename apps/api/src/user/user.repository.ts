import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, password: string, userRoles: UserRole[]) {
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: password,
        userRoles: userRoles,
      },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findNormalUsers() {
    const users = await this.prisma.user.findMany({
      where: {
        userRoles: {
          hasEvery: [UserRole.NORMAL_USER],
        },
      },
    });
    return users;
  }
}
