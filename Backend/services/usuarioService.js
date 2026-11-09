import { Usuario } from '../models/Usuario.js';

const SIN_PASSWORD = { attributes: { exclude: ['password_hash'] } };

export const listar = () =>
  Usuario.findAll({ ...SIN_PASSWORD, order: [['id', 'ASC']] });

export async function obtenerPorId(id) {
  const u = await Usuario.findByPk(id, SIN_PASSWORD);
  if (!u) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
  return u;
}