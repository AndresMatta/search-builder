import {
  IsString,
  IsIn,
  IsObject,
  ValidateNested,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserFilterType, Condition } from '@search-builder/http-types';

export class RulePropertiesDto {
  @IsIn(Object.values(UserFilterType))
  type: UserFilterType;

  @IsOptional()
  @IsString()
  joined_at?: string;

  @IsOptional()
  @IsString()
  role?: string;
}

export class RuleDto {
  @IsString()
  type: 'rule';

  @ValidateNested()
  @Type(() => RulePropertiesDto)
  properties: RulePropertiesDto;
}

export class GroupDto {
  @IsString()
  type: 'group';

  @IsIn(Object.values(Condition))
  condition: Condition;

  @IsObject()
  @ValidateNested()
  @Type(() => RuleDto, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: GroupDto, name: 'group' },
        { value: RuleDto, name: 'rule' },
      ],
    },
  })
  childrens: Record<string, RuleDto | GroupDto>;

  @IsOptional()
  @IsString()
  id?: string;
}

export class FilterDto {
  @ValidateNested()
  @Type(() => GroupDto)
  filter: GroupDto;
}

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsDate()
  joined_at: Date;
  @IsArray()
  @IsString({ each: true })
  roleIds: string[];
}
