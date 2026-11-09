import { query } from '../db/index.js';

export async function findAll() {
  const { rows } = await query('SELECT id, email, nombre FROM usuarios ORDER BY id');
  return rows;
}
export async function findById(id) {
  const { rows } = await query(
    'SELECT id, email, nombre FROM usuarios WHERE id = $1', [id]
  );
  return rows[0] ?? null;
}