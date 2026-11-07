import * as notificacionModel from '../models/notificacionModel.js';

export const listar = (filtros) => notificacionModel.findAll(filtros);
export const crear  = (data)    => notificacionModel.create(data);

export async function marcarLeida(id) {
  const n = await notificacionModel.marcarLeida(id);
  if (!n) throw Object.assign(new Error('Notificación no encontrada'), { status: 404 });
  return n;
}