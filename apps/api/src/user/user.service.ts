import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserByIdDto } from './dto/updateUserById.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(signupDto: SignupDto) {
    let user = null;

    const createdUser = await this.userRepository.createUser(signupDto);
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

  async login(loginDto: LoginDto) {
    let user = null;

    const email = loginDto.email;
    const password = loginDto.password;

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

  async updateUserById(id: string, updateUserByIdDto: UpdateUserByIdDto) {
    let user = null;

    const userFromDB = await this.userRepository.updateUserById(
      id,
      updateUserByIdDto
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

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    let user = null;

    const userFromDB = await this.userRepository.changePassword(
      id,
      changePasswordDto
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
}
