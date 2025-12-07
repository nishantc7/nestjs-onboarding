import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './database/database.config';
import { AccountModule } from './account/account.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    SequelizeModule.forRoot(getDatabaseConfig()),
    AccountModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
