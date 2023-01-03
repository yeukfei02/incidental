import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateUserByIdDto } from './dto/updateUserById.dto';
import { SignupRes } from './interface/signup.interface';
import { LoginRes } from './interface/login.interface';
import { GetNormalUsersRes } from './interface/getNormalUsers.interface';
import { GetUserByIdRes } from './interface/getUserById.interface';
import { ChangePasswordRes } from './interface/changePassword.interface';
import { UpdateUserByIdRes } from './interface/updateUserById.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<SignupRes> {
    let response: SignupRes;

    const name = signupDto.name;
    const email = signupDto.email;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(signupDto.password, salt);

    const userRoles = signupDto.userRoles;

    const user = await this.userService.signup(
      name,
      email,
      hashedPassword,
      userRoles
    );
    if (user) {
      response = {
        message: 'signup',
        user: user,
      };
    }

    return response;
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<LoginRes> {
    let response: LoginRes;

    const email = loginDto.email;
    const password = loginDto.password;

    const user = await this.userService.login(email, password);
    if (user) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      response = {
        message: 'login',
        user: user,
        token: token,
      };
    }

    return response;
  }

  @Get('/list/normalUsers')
  async getNormalUsers(): Promise<GetNormalUsersRes> {
    let response: GetNormalUsersRes;

    const users = await this.userService.getNormalUsers();
    if (users) {
      response = {
        message: 'get normal users',
        users: users,
      };
    }

    return response;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<GetUserByIdRes> {
    let response: GetUserByIdRes;

    const user = await this.userService.getUserById(id);
    if (user) {
      response = {
        message: 'get user by id',
        user: user,
      };
    }

    return response;
  }

  @Patch('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserByIdDto: UpdateUserByIdDto
  ): Promise<UpdateUserByIdRes> {
    let response: UpdateUserByIdRes;

    const name = updateUserByIdDto.name;
    const email = updateUserByIdDto.email;

    const user = await this.userService.updateUserById(id, name, email);
    if (user) {
      response = {
        message: 'update user by id',
        user: user,
      };
    }

    return response;
  }

  @Patch('/:id/changePassword')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<ChangePasswordRes> {
    let response: ChangePasswordRes;

    const password = changePasswordDto.password;

    const user = await this.userService.changePassword(id, password);
    if (user) {
      response = {
        message: 'change password',
        user: user,
      };
    }

    return response;
  }
}
