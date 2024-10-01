import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from 'src/modules/auth/role/role.service';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPolicy = this.reflector.get<string>('policy', context.getHandler());
    if (!requiredPolicy) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      return false;
    }

    const role = await this.roleService.findRoleByName(user.role);
    return role.policies.some(policy => policy.name === requiredPolicy);
  }
}
