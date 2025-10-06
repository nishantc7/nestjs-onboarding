import type { NonAttribute } from 'sequelize';
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
import { Setting } from '../../settings/models/setting.model';

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
  declare name: string;

  @HasMany(() => Setting, { foreignKey: 'account_id', as: 'settings' })
  declare settings: NonAttribute<Setting[]>;
}
