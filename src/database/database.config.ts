import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Account } from '../account/models/account.model';
import { Setting } from '../settings/models/setting.model';

const env = process.env.NODE_ENV || 'development';

interface DatabaseConfig {
  development: SequelizeModuleOptions;
  test: SequelizeModuleOptions;
  production: SequelizeModuleOptions;
}

const databaseConfig: DatabaseConfig = {
  development: {
    dialect: 'sqlite',
    storage: './database_development.sqlite',
    models: [Account, Setting],
    autoLoadModels: true,
    synchronize: false, // Use migrations instead
    logging: console.log,
  },
  test: {
    dialect: 'sqlite',
    storage: './database_test.sqlite',
    models: [Account, Setting],
    autoLoadModels: true,
    synchronize: false,
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DB_PATH || './database_production.sqlite',
    models: [Account, Setting],
    autoLoadModels: true,
    synchronize: false,
    logging: false,
  },
};

export const getDatabaseConfig = (): SequelizeModuleOptions => {
  return databaseConfig[env as keyof DatabaseConfig];
};
