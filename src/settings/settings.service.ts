import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Setting } from '../database/models/setting.model';
import { CreateSettingDto, UpdateSettingDto } from './dto/setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting)
    private readonly settingModel: typeof Setting,
  ) {}

  async createSetting(createSettingDto: CreateSettingDto): Promise<Setting> {
    try {
      const setting = await this.settingModel.create({
        name: createSettingDto.name,
        data_type: createSettingDto.dataType,
        value: createSettingDto.value,
        account_id: createSettingDto.accountId,
      });
      return setting;
    } catch {
      throw new InternalServerErrorException('Failed to create setting');
    }
  }

  async updateSetting(
    id: number,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    const setting = await this.settingModel.findByPk(id);

    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }

    try {
      await setting.update({
        name: updateSettingDto.name,
        data_type: updateSettingDto.dataType,
        value: updateSettingDto.value,
        account_id: updateSettingDto.accountId,
      });
      return setting;
    } catch {
      throw new InternalServerErrorException('Failed to update setting');
    }
  }

  async deleteSetting(id: number): Promise<void> {
    const setting = await this.settingModel.findByPk(id);

    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }

    try {
      await setting.destroy();
    } catch {
      throw new InternalServerErrorException('Failed to delete setting');
    }
  }
}
