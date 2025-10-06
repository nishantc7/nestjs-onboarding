import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto, UpdateSettingDto } from './dto/setting.dto';
import { Setting } from '../database/models/setting.model';
import { ValidateSettingPipe } from './pipes/validate-setting.pipe';
import { BasicAuthGuard } from '../auth/guards/basic-auth.guard';

@Controller('settings')
@UseGuards(BasicAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async createSetting(
    @Body(ValidateSettingPipe) createSettingDto: CreateSettingDto,
  ): Promise<Setting> {
    return await this.settingsService.createSetting(createSettingDto);
  }

  @Patch(':id')
  async updateSetting(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateSettingPipe) updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return await this.settingsService.updateSetting(id, updateSettingDto);
  }

  @Delete(':id')
  async deleteSetting(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.settingsService.deleteSetting(id);
  }
}
