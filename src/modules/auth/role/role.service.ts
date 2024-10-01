import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDTO } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDTO): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findRoleByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name }, relations: ['policies'] });
  }
}
