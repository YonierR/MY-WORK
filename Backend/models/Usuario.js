import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export class Usuario extends Model {}

Usuario.init({
  id:            { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  email:         { type: DataTypes.STRING(120), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  nombre:        { type: DataTypes.STRING(120) },
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
});