import { Notificacion } from '../models/Notificacion.js';

export async function listar({ leida, tipo } = {}) {
  const where = {};
  if (leida !== undefined) where.leida = leida === 'true' || leida === true;
  if (tipo) where.tipo = tipo;
  return Notificacion.findAll({ where, order: [['fecha_objetivo', 'DESC'], ['id', 'DESC']] });
}

export const crear = (data) => Notificacion.create(data);

export async function marcarLeida(id) {
  const n = await Notificacion.findByPk(id);
  if (!n) throw Object.assign(new Error('Notificación no encontrada'), { status: 404 });
  await n.update({ leida: true });
  return n;
}