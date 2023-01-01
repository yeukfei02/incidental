import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SignupRes } from './interface/signup.interface';
import { LoginRes } from './interface/login.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<SignupRes> {
    let response: SignupRes;

    const email = signupDto.email;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(signupDto.password, salt);

    const userRoles = signupDto.userRoles;

    const user = await this.userService.signup(
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
}
