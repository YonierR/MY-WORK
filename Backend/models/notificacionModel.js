import { query } from '../db/index.js';

export async function findAll({ leida, tipo } = {}) {
  const params = [];
  let sql = 'SELECT * FROM notificaciones WHERE 1=1';
  if (leida !== undefined) {
    params.push(leida === 'true' || leida === true);
    sql += ` AND leida = $${params.length}`;
  }
  if (tipo) { params.push(tipo); sql += ` AND tipo = $${params.length}`; }
  sql += ' ORDER BY fecha_objetivo DESC, id DESC';
  const { rows } = await query(sql, params);
  return rows;
}
export async function create(data) {
  const { cuota_id, tipo, titulo, mensaje, fecha_objetivo } = data;
  const { rows } = await query(
    `INSERT INTO notificaciones (cuota_id, tipo, titulo, mensaje, fecha_objetivo)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [cuota_id, tipo, titulo, mensaje, fecha_objetivo]
  );
  return rows[0];
}
export async function marcarLeida(id) {
  const { rows } = await query(
    'UPDATE notificaciones SET leida = TRUE WHERE id = $1 RETURNING *', [id]
  );
  return rows[0] ?? null;
}