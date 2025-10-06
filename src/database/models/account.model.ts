import * as sequelize from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Setting } from './setting.model';

@Table({
  tableName: 'accounts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Setting, { foreignKey: 'account_id', as: 'settings' })
  settings: sequelize.NonAttribute<Setting[]>;
}
