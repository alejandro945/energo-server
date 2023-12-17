import { AlertSummary } from '@/domain/entities/Alert';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Groups } from '../utils/groups';

export class SiteDTO {
  @Expose({ groups: Groups.all() })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE], message: "Name must be a string" })
  @IsOptional({ groups: [Groups.UPDATE] })
  @IsNotEmpty({ groups: [Groups.CREATE], message: "Name is required in creation" })
  @MaxLength(50, { groups: [Groups.CREATE], message: 'Name is too long' })
  name!: string;

  @Expose({ groups: Groups.all() })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE], message: "Savings must be a string" })
  @IsOptional({ groups: [Groups.UPDATE] })
  savings!: string;

  @Expose({ groups: Groups.all() })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE], message: "Uptime must be a string"})
  @IsOptional({ groups: [Groups.UPDATE]})
  uptime!: string;

  @Expose({ groups: Groups.all() })
  @IsString({ groups: [Groups.CREATE, Groups.UPDATE], message: "Power must be a string"})
  @IsOptional({ groups: [Groups.UPDATE]})
  power!: string;

}