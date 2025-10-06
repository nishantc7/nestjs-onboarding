import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from '../database/models/account.model';
import { CreateAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const { name } = createAccountDto;

    // Check for duplicate account name
    const existingAccount = await this.accountModel.findOne({
      where: { name },
    });

    if (existingAccount) {
      throw new ConflictException(`Account with name '${name}' already exists`);
    }

    try {
      const account = await this.accountModel.create({
        name,
      });
      return account;
    } catch {
      throw new InternalServerErrorException('Failed to create account');
    }
  }
}
