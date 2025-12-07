import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { Setting } from './models/setting.model';

@Module({
  imports: [SequelizeModule.forFeature([Setting])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
