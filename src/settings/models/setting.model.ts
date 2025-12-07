import type { NonAttribute } from 'sequelize';
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
import { Account } from '../../account/models/account.model';
import { DataTypeEnum } from '../../common/constants/data-types.constant';

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
  declare name: string;

  @AllowNull(false)
  @Column(DataType.ENUM({ values: Object.values(DataTypeEnum) }))
  declare data_type: DataTypeEnum;

  @AllowNull(false)
  @ForeignKey(() => Account)
  @Column(DataType.INTEGER)
  declare account_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare value: string;

  @BelongsTo(() => Account)
  declare account: NonAttribute<Account>;
}
