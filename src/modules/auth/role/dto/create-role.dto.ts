import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(25)
  name: string;
}
