import * as usuarioModel from '../models/usuarioModel.js';

export const listar = () => usuarioModel.findAll();

export async function obtenerPorId(id) {
  const u = await usuarioModel.findById(id);
  if (!u) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
  return u;
}