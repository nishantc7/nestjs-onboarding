import {
  IsString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { DataTypeEnum } from '../../common/constants/data-types.constant';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(DataTypeEnum)
  dataType: DataTypeEnum;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsInt()
  accountId: number;
}

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEnum(DataTypeEnum)
  dataType?: DataTypeEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  value?: string;

  @IsOptional()
  @IsInt()
  accountId?: number;
}
