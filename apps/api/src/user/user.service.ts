import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(
    name: string,
    email: string,
    password: string,
    userRoles: UserRole[]
  ) {
    let user = null;

    const createdUser = await this.userRepository.createUser(
      name,
      email,
      password,
      userRoles
    );
    if (createdUser) {
      user = {
        id: createdUser.id,
        name: createdUser.name,
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
          name: userFromDB.name,
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
    let normalUsers = [];

    const users = await this.userRepository.findNormalUsers();
    if (users) {
      normalUsers = users.map((user) => {
        const data = {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
          userRoles: user.userRoles,
        };
        return data;
      });
    }

    return normalUsers;
  }

  async getUserById(id: string) {
    let user = null;

    const userFromDB = await this.userRepository.findUserById(id);
    if (userFromDB) {
      user = {
        id: userFromDB.id,
        name: userFromDB.name,
        email: userFromDB.email,
        created_at: userFromDB.created_at,
        updated_at: userFromDB.updated_at,
        userRoles: userFromDB.userRoles,
        creatorIncidents: userFromDB.creatorIncidents,
        assigneeIncidents: userFromDB.assigneeIncidents,
      };
    }

    return user;
  }

  async updateUserById(
    id: string,
    name: string,
    email: string,
    userRole: UserRole
  ) {
    let user = null;

    const userFromDB = await this.userRepository.updateUserById(
      id,
      name,
      email,
      userRole
    );
    if (userFromDB) {
      user = {
        id: userFromDB.id,
        name: userFromDB.name,
        email: userFromDB.email,
        created_at: userFromDB.created_at,
        updated_at: userFromDB.updated_at,
        userRoles: userFromDB.userRoles,
      };
    }

    return user;
  }

  async changePassword(id: string, password: string) {
    let user = null;

    const userFromDB = await this.userRepository.changePassword(id, password);
    if (userFromDB) {
      user = {
        id: userFromDB.id,
        name: userFromDB.name,
        email: userFromDB.email,
        created_at: userFromDB.created_at,
        updated_at: userFromDB.updated_at,
        userRoles: userFromDB.userRoles,
      };
    }

    return user;
  }
}
