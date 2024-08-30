import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUsersDTO } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersDTO } from '../domains/users/dto/users.dto';
import { ResponseTokenDTO } from './dto/response-token.dto';
import { UnauthorizedDTO } from './dto/unauthorized.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiTags('auth')
  @ApiUnauthorizedResponse({ type: UnauthorizedDTO })
  @ApiOkResponse({ type: ResponseTokenDTO })
  @ApiBody({ type: LoginUsersDTO })
  async login(@Request() req): Promise<any> {
    const data = await this.authService.login(req.user);
    this.logger.info('get access token', { data: data });
    return data;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiTags('profile')
  @ApiUnauthorizedResponse({ type: UnauthorizedDTO })
  @ApiOkResponse({ type: UsersDTO })
  @ApiBearerAuth()
  async getMe(@Request() req): Promise<any> {
    const user = await req.user;
    this.logger.info('get user info', { data: user });
    return user;
  }
}
