import * as cuotaModel from '../models/cuotaModel.js';

export const listar = (filtros) => cuotaModel.findAll(filtros);

export async function obtenerPorId(id) {
  const c = await cuotaModel.findById(id);
  if (!c) throw Object.assign(new Error('Cuota no encontrada'), { status: 404 });
  return c;
}

export async function actualizar(id, data) {
  const c = await cuotaModel.update(id, data);
  if (!c) throw Object.assign(new Error('Cuota no encontrada'), { status: 404 });
  return c;
}