import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Policy } from './policy.entity';

@Entity('user_roles')
export class UserRole {
  @Column()
  user_id: number;

  @Column()
  role_id: number;
}
