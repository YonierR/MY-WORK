import { Op } from 'sequelize';
import { Cliente } from '../models/Cliente.js';

export async function listar({ estado, q } = {}) {
  const where = {};
  if (estado) where.estado = estado;
  if (q) {
    where[Op.or] = [
      { nombre:  { [Op.iLike]: `%${q}%` } },
      { num_doc: { [Op.iLike]: `%${q}%` } },
    ];
  }
  return Cliente.findAll({ where, order: [['nombre', 'ASC']] });
}

export async function obtenerPorId(id) {
  const c = await Cliente.findByPk(id);
  if (!c) throw Object.assign(new Error('Cliente no encontrado'), { status: 404 });
  return c;
}

export const crear = (data) => Cliente.create(data);

export async function actualizar(id, data) {
  const c = await Cliente.findByPk(id);
  if (!c) throw Object.assign(new Error('Cliente no encontrado'), { status: 404 });
  await c.update(data);
  return c;
}

export async function desactivar(id) {
  const c = await Cliente.findByPk(id);
  if (!c) throw Object.assign(new Error('Cliente no encontrado'), { status: 404 });
  await c.update({ estado: 'INACTIVO' });
  return { mensaje: 'Cliente desactivado', cliente: c };
}