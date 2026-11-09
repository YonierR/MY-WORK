import { Cliente, Prestamo, Cuota } from '../models/index.js';
import { sequelize } from '../db/sequelize.js';

function avanzarFecha(fecha, periodicidad, n) {
  const d = new Date(fecha);
  switch (periodicidad) {
    case 'SEMANAL':   d.setDate(d.getDate() + 7 * n); break;
    case 'QUINCENAL': d.setDate(d.getDate() + 15 * n); break;
    case 'MENSUAL':   d.setMonth(d.getMonth() + n); break;
  }
  return d.toISOString().slice(0, 10);
}

export async function listar({ estado, cliente_id } = {}) {
  const where = {};
  if (estado)     where.estado = estado;
  if (cliente_id) where.cliente_id = cliente_id;

  const rows = await Prestamo.findAll({
    where,
    include: [{ model: Cliente, as: 'cliente', attributes: ['nombre'] }],
    order: [['created_at', 'DESC']],
  });
  // Mantener contrato plano (cliente_nombre) que ya consume el frontend
  return rows.map(p => ({ ...p.toJSON(), cliente_nombre: p.cliente?.nombre ?? null }));
}

export async function obtenerPorId(id) {
  const p = await Prestamo.findByPk(id, {
    include: [
      { model: Cliente, as: 'cliente', attributes: ['nombre'] },
      { model: Cuota,   as: 'cuotas' },
    ],
  });
  if (!p) throw Object.assign(new Error('Préstamo no encontrado'), { status: 404 });

  const data = p.toJSON();
  data.cuotas.sort((a, b) => a.numero - b.numero);
  data.cliente_nombre = data.cliente?.nombre ?? null;
  return data;
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

  const id = await sequelize.transaction(async (t) => {
    const prestamo = await Prestamo.create({
      cliente_id, monto, tasa_pct, n_cuotas, periodicidad,
      fecha_desembolso, fecha_primera_cuota, observacion,
      total_pagar: totalPagar,
      saldo: totalPagar,
      estado: 'ACTIVO',
    }, { transaction: t });

    const cuotas = [];
    for (let i = 1; i <= n_cuotas; i++) {
      cuotas.push({
        prestamo_id: prestamo.id,
        numero: i,
        fecha_limite: avanzarFecha(fecha_primera_cuota, periodicidad, i - 1),
        monto: i === n_cuotas ? ajuste : montoCuota,
      });
    }
    await Cuota.bulkCreate(cuotas, { transaction: t });
    return prestamo.id;
  });

  return obtenerPorId(id);
}

export async function actualizar(id, data) {
  const p = await Prestamo.findByPk(id);
  if (!p) throw Object.assign(new Error('Préstamo no encontrado'), { status: 404 });
  await p.update({
    observacion: data.observacion ?? p.observacion,
    estado:      data.estado      ?? p.estado,
  });
  return p;
}

export async function cancelar(id) {
  const p = await Prestamo.findByPk(id);
  if (!p) throw Object.assign(new Error('Préstamo no encontrado'), { status: 404 });
  await p.update({ estado: 'CANCELADO' });
  return { mensaje: 'Préstamo cancelado', prestamo: p };
}