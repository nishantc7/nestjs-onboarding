import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { DataTypeEnum } from '../../common/constants/data-types.constant';
import { CreateSettingDto, UpdateSettingDto } from '../dto/setting.dto';

@Injectable()
export class ValidateSettingPipe implements PipeTransform {
  transform(value: CreateSettingDto | UpdateSettingDto) {
    if (!value.dataType || !value.value) {
      return value;
    }

    const isValid = this.validateValueAgainstType(value.value, value.dataType);

    if (!isValid) {
      throw new BadRequestException(
        `Value '${value.value}' is not a valid ${value.dataType}`,
      );
    }

    return value;
  }

  private validateValueAgainstType(
    value: string,
    dataType: DataTypeEnum,
  ): boolean {
    switch (dataType) {
      case DataTypeEnum.STRING:
        return typeof value === 'string';
      case DataTypeEnum.NUMBER:
        return !isNaN(Number(value));
      case DataTypeEnum.BOOLEAN:
        return value === 'true' || value === 'false';
      case DataTypeEnum.JSON:
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      default:
        return false;
    }
  }
}
