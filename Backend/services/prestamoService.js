import * as prestamoModel from '../models/prestamoModel.js';
import { withTransaction } from '../db/index.js';

function avanzarFecha(fecha, periodicidad, n) {
  const d = new Date(fecha);
  switch (periodicidad) {
    case 'SEMANAL':   d.setDate(d.getDate() + 7 * n); break;
    case 'QUINCENAL': d.setDate(d.getDate() + 15 * n); break;
    case 'MENSUAL':   d.setMonth(d.getMonth() + n); break;
  }
  return d.toISOString().slice(0, 10);
}

export const listar = (filtros) => prestamoModel.findAll(filtros);

export async function obtenerPorId(id) {
  const p = await prestamoModel.findById(id);
  if (!p) throw Object.assign(new Error('Préstamo no encontrado'), { status: 404 });
  const cuotas = await prestamoModel.findCuotasByPrestamo(id);
  return { ...p, cuotas };
}

export async function crear(data) {
  const { cliente_id, monto, tasa_pct, n_cuotas, periodicidad,
          fecha_desembolso, fecha_primera_cuota, observacion } = data;

  if (!cliente_id || !monto || !n_cuotas || !periodicidad) {
    throw Object.assign(new Error('Faltan campos obligatorios'), { status: 400 });
  }

  const totalPagar = Number((monto * (1 + tasa_pct / 100)).toFixed(2));
  const montoCuota = Number((totalPagar / n_cuotas).toFixed(2));
  const ajuste     = Number((totalPagar - montoCuota * (n_cuotas - 1)).toFixed(2));

  // 🐛 FIX: transacción atómica — no quedan préstamos huérfanos si falla una cuota
  return withTransaction(async (client) => {
    const prestamo = await prestamoModel.createTx(client, {
      cliente_id, monto, tasa_pct, n_cuotas, periodicidad,
      fecha_desembolso, fecha_primera_cuota, observacion, total_pagar: totalPagar,
    });

    for (let i = 1; i <= n_cuotas; i++) {
      const fechaLimite = avanzarFecha(fecha_primera_cuota, periodicidad, i - 1);
      const montoI = i === n_cuotas ? ajuste : montoCuota;
      await prestamoModel.createCuotaTx(client, {
        prestamo_id: prestamo.id, numero: i,
        fecha_limite: fechaLimite, monto: montoI,
      });
    }

    const cuotas = await prestamoModel.findCuotasByPrestamo(prestamo.id, client);
    return { ...prestamo, cuotas };
  });
}

export async function actualizar(id, data) {
  const p = await prestamoModel.update(id, data);
  if (!p) throw Object.assign(new Error('Préstamo no encontrado'), { status: 404 });
  return p;
}

export async function cancelar(id) {
  const p = await prestamoModel.updateEstado(id, 'CANCELADO');
  if (!p) throw Object.assign(new Error('Préstamo no encontrado'), { status: 404 });
  return { mensaje: 'Préstamo cancelado', prestamo: p };
}