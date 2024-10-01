import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Policy } from './policy.entity';

@Entity('role_policies')
export class RolePolicy {
  @Column()
  role_id: number;

  @Column()
  policy_id: number;
}
