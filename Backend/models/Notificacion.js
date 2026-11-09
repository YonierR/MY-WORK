import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export class Notificacion extends Model {}

Notificacion.init({
  id:             { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  cuota_id:       { type: DataTypes.BIGINT, allowNull: false },
  tipo:           { type: DataTypes.ENUM('PROXIMA', 'VENCIDA'), allowNull: false },
  titulo:         { type: DataTypes.STRING(160), allowNull: false },
  mensaje:        { type: DataTypes.TEXT, allowNull: false },
  fecha_objetivo: { type: DataTypes.DATEONLY, allowNull: false },
  leida:          { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  sequelize,
  modelName: 'Notificacion',
  tableName: 'notificaciones',
  createdAt: 'created_at',
  updatedAt: false,
  timestamps: true,
});