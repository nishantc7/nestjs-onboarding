import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './models/account.model';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
