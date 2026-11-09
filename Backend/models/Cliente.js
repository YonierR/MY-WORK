import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export class Cliente extends Model {}

Cliente.init({
  id:         { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.BIGINT },
  nombre:     { type: DataTypes.STRING(120), allowNull: false },
  tipo_doc:   { type: DataTypes.ENUM('CC', 'CE', 'TI', 'PASAPORTE', 'OTRO'), allowNull: false },
  num_doc:    { type: DataTypes.STRING(20), allowNull: false, unique: true },
  telefono:   { type: DataTypes.STRING(15), allowNull: false },
  email:      { type: DataTypes.STRING(120) },
  direccion:  { type: DataTypes.STRING(200) },
  notas:      { type: DataTypes.STRING(500) },
  estado:     { type: DataTypes.ENUM('ACTIVO', 'INACTIVO'), allowNull: false, defaultValue: 'ACTIVO' },
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'clientes',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});