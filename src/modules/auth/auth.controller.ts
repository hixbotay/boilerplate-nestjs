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
  ApiCreatedResponse,
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUsersDTO } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersDTO } from '../users/dto/users.dto';
import { ResponseTokenDTO } from './dto/response-token.dto';
import { UnauthorizedDTO } from './dto/unauthorized.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RoleService } from './role/role.service';
import { CreateRoleDTO } from './role/dto/create-role.dto';
import { PolicyGuard } from './role/policy.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
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

  @Post('register')
  @ApiTags('auth')
  @ApiCreatedResponse({ type: ResponseTokenDTO })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiBody({ type: LoginUsersDTO })
  async register(@Request() req): Promise<any> {
    const data = await this.authService.register(req.body);
    this.logger.info('User registered and access token generated', { data: data });
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

  @Post('role')
  @UseGuards(JwtAuthGuard, PolicyGuard)
  @ApiTags('role')
  @ApiCreatedResponse({ description: 'Role created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBody({ type: CreateRoleDTO })
  async createRole(@Request() req): Promise<any> {
    const data = await this.roleService.createRole(req.body);
    this.logger.info('Role created', { data: data });
    return data;
  }
}
