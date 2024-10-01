import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;
}
