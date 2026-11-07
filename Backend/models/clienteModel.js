import { query } from '../db/index.js';

export async function findAll({ estado, q } = {}) {
  const params = [];
  let sql = 'SELECT * FROM clientes WHERE 1=1';
  if (estado) { params.push(estado); sql += ` AND estado = $${params.length}`; }
  if (q) {
    params.push(`%${q}%`);
    sql += ` AND (nombre ILIKE $${params.length} OR num_doc ILIKE $${params.length})`;
  }
  sql += ' ORDER BY nombre';
  const { rows } = await query(sql, params);
  return rows;
}
export async function findById(id) {
  const { rows } = await query('SELECT * FROM clientes WHERE id = $1', [id]);
  return rows[0] ?? null;
}
export async function create(data) {
  const { usuario_id, nombre, tipo_doc, num_doc, telefono, email, direccion, notas, estado } = data;
  const { rows } = await query(
    `INSERT INTO clientes
       (usuario_id, nombre, tipo_doc, num_doc, telefono, email, direccion, notas, estado)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8, COALESCE($9,'ACTIVO'))
     RETURNING *`,
    [usuario_id, nombre, tipo_doc, num_doc, telefono, email, direccion, notas, estado]
  );
  return rows[0];
}
export async function update(id, data) {
  const { nombre, tipo_doc, num_doc, telefono, email, direccion, notas, estado } = data;
  const { rows } = await query(
    `UPDATE clientes SET
       nombre    = COALESCE($1, nombre),
       tipo_doc  = COALESCE($2, tipo_doc),
       num_doc   = COALESCE($3, num_doc),
       telefono  = COALESCE($4, telefono),
       email     = COALESCE($5, email),
       direccion = COALESCE($6, direccion),
       notas     = COALESCE($7, notas),
       estado    = COALESCE($8, estado)
     WHERE id = $9 RETURNING *`,
    [nombre, tipo_doc, num_doc, telefono, email, direccion, notas, estado, id]
  );
  return rows[0] ?? null;
}
export async function updateEstado(id, estado) {
  const { rows } = await query(
    `UPDATE clientes SET estado = $1 WHERE id = $2 RETURNING *`,
    [estado, id]
  );
  return rows[0] ?? null;
}