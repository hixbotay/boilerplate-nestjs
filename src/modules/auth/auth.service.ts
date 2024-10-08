import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponseUsersDTO } from 'src/modules/users/dto/login-response-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<LoginResponseUsersDTO> {
    const user = await this.userService.getByUsername(username);
    console.log(user);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async register(user: any) {
    const userExists = await this.userService.getByUsername(user.username);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = await this.userService.create(user);
    let res = await this.login(user);
    return {
      ...res,
      user: createdUser
    };
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
