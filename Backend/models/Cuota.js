import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export class Cuota extends Model {}

Cuota.init({
  id:           { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  prestamo_id:  { type: DataTypes.BIGINT, allowNull: false },
  numero:       { type: DataTypes.INTEGER, allowNull: false },
  fecha_limite: { type: DataTypes.DATEONLY, allowNull: false },
  monto:        { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  monto_pagado: { type: DataTypes.DECIMAL(14, 2), allowNull: false, defaultValue: 0 },
  estado:       { type: DataTypes.ENUM('PENDIENTE', 'PARCIAL', 'PAGADA', 'VENCIDA', 'ANULADA'), allowNull: false, defaultValue: 'PENDIENTE' },
}, {
  sequelize,
  modelName: 'Cuota',
  tableName: 'cuotas',
});