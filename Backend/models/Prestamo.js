import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export class Prestamo extends Model {}

Prestamo.init({
  id:                  { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  cliente_id:          { type: DataTypes.BIGINT, allowNull: false },
  monto:               { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  tasa_pct:            { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  n_cuotas:            { type: DataTypes.INTEGER, allowNull: false },
  periodicidad:        { type: DataTypes.ENUM('SEMANAL', 'QUINCENAL', 'MENSUAL'), allowNull: false },
  fecha_desembolso:    { type: DataTypes.DATEONLY, allowNull: false },
  fecha_primera_cuota: { type: DataTypes.DATEONLY, allowNull: false },
  observacion:         { type: DataTypes.STRING(300) },
  total_pagar:         { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  saldo:               { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  estado:              { type: DataTypes.ENUM('ACTIVO', 'PAGADO', 'CANCELADO'), allowNull: false, defaultValue: 'ACTIVO' },
}, {
  sequelize,
  modelName: 'Prestamo',
  tableName: 'prestamos',
  createdAt: 'created_at',
  updatedAt: false,
  timestamps: true,
});