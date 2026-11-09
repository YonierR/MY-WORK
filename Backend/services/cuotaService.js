import { Cuota } from '../models/Cuota.js';

export async function listar({ prestamo_id, estado } = {}) {
  const where = {};
  if (prestamo_id) where.prestamo_id = prestamo_id;
  if (estado)      where.estado = estado;
  return Cuota.findAll({ where, order: [['prestamo_id', 'ASC'], ['numero', 'ASC']] });
}

export async function obtenerPorId(id) {
  const c = await Cuota.findByPk(id);
  if (!c) throw Object.assign(new Error('Cuota no encontrada'), { status: 404 });
  return c;
}

export async function actualizar(id, data) {
  const c = await Cuota.findByPk(id);
  if (!c) throw Object.assign(new Error('Cuota no encontrada'), { status: 404 });
  await c.update({
    fecha_limite: data.fecha_limite ?? c.fecha_limite,
    estado:       data.estado       ?? c.estado,
  });
  return c;
}