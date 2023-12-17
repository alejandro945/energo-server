import { Alert } from '@/domain/entities/Alert';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Groups } from '../utils/groups';

export class SiteDTO {
  @Exclude()
  id!: string;

  @Expose({ groups: Groups.all() })
  @IsString({groups: [Groups.CREATE, Groups.UPDATE], message: "Name must be a string" })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE], message: "Name is required in creation" })
  @MaxLength(50,{groups: [Groups.CREATE], message: 'Name is too long' })
  name!: string;

  @Expose({ groups: Groups.all() })
  @IsString()
  @IsOptional()
  savings!: string;

  @Expose({ groups: Groups.all() })
  @IsString()
  @IsOptional()
  uptime!: string;

  @Expose({ groups: Groups.all() })
  @IsString()
  @IsOptional()
  power!: string;

  @Expose({ groups: Groups.all() })
  @IsOptional()
  alerts!: Alert[];

}