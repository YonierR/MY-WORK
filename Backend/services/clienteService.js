import * as clienteModel from '../models/clienteModel.js';

export const listar = (filtros) => clienteModel.findAll(filtros);

export async function obtenerPorId(id) {
  const c = await clienteModel.findById(id);
  if (!c) throw Object.assign(new Error('Cliente no encontrado'), { status: 404 });
  return c;
}

export const crear = (data) => clienteModel.create(data);

export async function actualizar(id, data) {
  const c = await clienteModel.update(id, data);
  if (!c) throw Object.assign(new Error('Cliente no encontrado'), { status: 404 });
  return c;
}

export async function desactivar(id) {
  const c = await clienteModel.updateEstado(id, 'INACTIVO');
  if (!c) throw Object.assign(new Error('Cliente no encontrado'), { status: 404 });
  return { mensaje: 'Cliente desactivado', cliente: c };
}