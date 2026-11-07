import { query } from '../db/index.js';

export async function findAll({ prestamo_id, estado } = {}) {
  const params = [];
  let sql = 'SELECT * FROM cuotas WHERE 1=1';
  if (prestamo_id) { params.push(prestamo_id); sql += ` AND prestamo_id = $${params.length}`; }
  if (estado)      { params.push(estado);      sql += ` AND estado = $${params.length}`; }
  sql += ' ORDER BY prestamo_id, numero';
  const { rows } = await query(sql, params);
  return rows;
}
export async function findById(id) {
  const { rows } = await query('SELECT * FROM cuotas WHERE id = $1', [id]);
  return rows[0] ?? null;
}
export async function update(id, { fecha_limite, estado }) {
  const { rows } = await query(
    `UPDATE cuotas SET
       fecha_limite = COALESCE($1, fecha_limite),
       estado       = COALESCE($2, estado)
     WHERE id = $3 RETURNING *`,
    [fecha_limite, estado, id]
  );
  return rows[0] ?? null;
}
export async function lockByIdTx(client, id) {
  const { rows } = await client.query(
    'SELECT * FROM cuotas WHERE id = $1 FOR UPDATE', [id]
  );
  return rows[0] ?? null;
}
export async function updatePagoTx(client, id, montoPagado, estado) {
  const { rows } = await client.query(
    `UPDATE cuotas SET monto_pagado = $1, estado = $2 WHERE id = $3 RETURNING *`,
    [montoPagado, estado, id]
  );
  return rows[0];
}