import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(email: string, password: string, userRoles: UserRole[]) {
    let user = null;

    const createdUser = await this.userRepository.createUser(
      email,
      password,
      userRoles
    );
    if (createdUser) {
      user = {
        id: createdUser.id,
        email: createdUser.email,
        created_at: createdUser.created_at,
        updated_at: createdUser.updated_at,
        userRoles: createdUser.userRoles,
      };
    }

    return user;
  }

  async login(email: string, password: string) {
    let user = null;

    const userFromDB = await this.userRepository.findUserByEmail(email);
    if (userFromDB) {
      const isValidPassword = bcrypt.compareSync(password, userFromDB.password);
      if (isValidPassword) {
        user = {
          id: userFromDB.id,
          email: userFromDB.email,
          created_at: userFromDB.created_at,
          updated_at: userFromDB.updated_at,
          userRoles: userFromDB.userRoles,
        };
      }
    }

    return user;
  }

  async getNormalUsers() {
    const users = await this.userRepository.findNormalUsers();
    return users;
  }
}
