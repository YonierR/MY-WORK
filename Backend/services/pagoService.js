import * as pagoModel from '../models/pagoModel.js';
import * as cuotaModel from '../models/cuotaModel.js';
import * as prestamoModel from '../models/prestamoModel.js';
import { withTransaction } from '../db/index.js';

export const listar = (filtros) => pagoModel.findAll(filtros);

export async function registrar(data) {
  const { cuota_id, prestamo_id, monto, fecha_pago, observacion } = data;

  if (!cuota_id || !prestamo_id || !monto) {
    throw Object.assign(
      new Error('cuota_id, prestamo_id y monto son obligatorios'),
      { status: 400 }
    );
  }

  return withTransaction(async (client) => {
    const cuota = await cuotaModel.lockByIdTx(client, cuota_id);
    if (!cuota) throw Object.assign(new Error('Cuota no encontrada'), { status: 404 });

    const pendiente = Number(cuota.monto) - Number(cuota.monto_pagado);
    if (Number(monto) > pendiente) {
      throw Object.assign(
        new Error(`El monto excede lo pendiente (${pendiente})`),
        { status: 400 }  // ← mismo status que antes
      );
    }

    const pago = await pagoModel.createTx(client, {
      cuota_id, prestamo_id, monto, fecha_pago, observacion,
    });

    const nuevoPagado = Number(cuota.monto_pagado) + Number(monto);
    let nuevoEstado;
    if (nuevoPagado >= Number(cuota.monto)) nuevoEstado = 'PAGADA';
    else if (nuevoPagado > 0)                nuevoEstado = 'PARCIAL';
    else                                      nuevoEstado = 'PENDIENTE';

    await cuotaModel.updatePagoTx(client, cuota_id, nuevoPagado, nuevoEstado);

    const prestamo = await prestamoModel.updateSaldoTx(client, prestamo_id, monto);
    if (Number(prestamo.saldo) <= 0) {
      await prestamoModel.updateEstadoTx(client, prestamo_id, 'PAGADO');
    }

    return {
      pago,
      cuota: { ...cuota, monto_pagado: nuevoPagado, estado: nuevoEstado },
    };
  });
}