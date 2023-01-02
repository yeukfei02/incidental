import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    userRoles: UserRole[]
  ) {
    const user = await this.prisma.user.create({
      data: {
        name: name,
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

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        creatorIncidents: true,
        assigneeIncidents: true,
      },
    });
    return user;
  }

  async changePassword(id: string, password: string) {
    const salt = bcrypt.genSaltSync(10);

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: bcrypt.hashSync(password, salt),
      },
    });
    return user;
  }
}
