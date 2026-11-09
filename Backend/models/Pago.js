import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export class Pago extends Model {}

Pago.init({
  id:          { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  cuota_id:    { type: DataTypes.BIGINT, allowNull: false },
  prestamo_id: { type: DataTypes.BIGINT, allowNull: false },
  monto:       { type: DataTypes.DECIMAL(14, 2), allowNull: false },
  fecha_pago:  { type: DataTypes.DATEONLY, allowNull: false },
  observacion: { type: DataTypes.TEXT },
}, {
  sequelize,
  modelName: 'Pago',
  tableName: 'pagos',
});