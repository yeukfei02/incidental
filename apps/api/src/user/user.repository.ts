import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { UpdateUserByIdDto } from './dto/updateUserById.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signupDto: SignupDto) {
    const name = signupDto.name;
    const email = signupDto.email;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(signupDto.password, salt);

    const userRoles = signupDto.userRoles;

    const user = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
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
      orderBy: {
        name: 'asc',
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

  async updateUserById(id: string, updateUserByIdDto: UpdateUserByIdDto) {
    const name = updateUserByIdDto.name;
    const email = updateUserByIdDto.email;

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        updated_at: new Date(),
      },
    });
    return user;
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const password = changePasswordDto.password;

    const salt = bcrypt.genSaltSync(10);

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: bcrypt.hashSync(password, salt),
        updated_at: new Date(),
      },
    });
    return user;
  }
}
