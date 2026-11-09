import { Pago, Cuota, Prestamo } from '../models/index.js';
import { sequelize } from '../db/sequelize.js';

export async function listar({ prestamo_id, cuota_id } = {}) {
  const where = {};
  if (prestamo_id) where.prestamo_id = prestamo_id;
  if (cuota_id)    where.cuota_id = cuota_id;
  return Pago.findAll({ where, order: [['fecha_pago', 'DESC'], ['id', 'DESC']] });
}

export async function registrar(data) {
  const { cuota_id, prestamo_id, monto, fecha_pago, observacion } = data;
  if (!cuota_id || !prestamo_id || !monto) {
    throw Object.assign(new Error('cuota_id, prestamo_id y monto son obligatorios'), { status: 400 });
  }

  return sequelize.transaction(async (t) => {
    const cuota = await Cuota.findByPk(cuota_id, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!cuota) throw Object.assign(new Error('Cuota no encontrada'), { status: 404 });

    const pendiente = Number(cuota.monto) - Number(cuota.monto_pagado);
    if (Number(monto) > pendiente) {
      throw Object.assign(new Error(`El monto excede lo pendiente (${pendiente})`), { status: 400 });
    }

    const pago = await Pago.create({
      cuota_id, prestamo_id, monto,
      fecha_pago: fecha_pago ?? new Date().toISOString().slice(0, 10),
      observacion,
    }, { transaction: t });

    const nuevoPagado = Number(cuota.monto_pagado) + Number(monto);
    const nuevoEstado =
      nuevoPagado >= Number(cuota.monto) ? 'PAGADA'
      : nuevoPagado > 0                  ? 'PARCIAL'
      : 'PENDIENTE';
    await cuota.update({ monto_pagado: nuevoPagado, estado: nuevoEstado }, { transaction: t });

    const prestamo = await Prestamo.findByPk(prestamo_id, { transaction: t, lock: t.LOCK.UPDATE });
    const nuevoSaldo = Number(prestamo.saldo) - Number(monto);
    await prestamo.update({
      saldo: nuevoSaldo <= 0 ? 0 : nuevoSaldo,
      estado: nuevoSaldo <= 0 ? 'PAGADO' : prestamo.estado,
    }, { transaction: t });

    return {
      pago,
      cuota: { ...cuota.toJSON(), monto_pagado: nuevoPagado, estado: nuevoEstado },
    };
  });
}