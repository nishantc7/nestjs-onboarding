import * as sequelize from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Account } from './account.model';

export enum DataTypeEnum {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  JSON = 'json',
}

@Table({
  tableName: 'settings',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Setting extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.ENUM('string', 'number', 'boolean', 'json'))
  data_type: DataTypeEnum;

  @AllowNull(false)
  @ForeignKey(() => Account)
  @Column(DataType.INTEGER)
  account_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  value: string;

  @BelongsTo(() => Account)
  account: sequelize.NonAttribute<Account>;
}
