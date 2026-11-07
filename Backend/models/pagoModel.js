import { query } from '../db/index.js';

export async function findAll({ prestamo_id, cuota_id } = {}) {
  const params = [];
  let sql = 'SELECT * FROM pagos WHERE 1=1';
  if (prestamo_id) { params.push(prestamo_id); sql += ` AND prestamo_id = $${params.length}`; }
  if (cuota_id)    { params.push(cuota_id);    sql += ` AND cuota_id = $${params.length}`; }
  sql += ' ORDER BY fecha_pago DESC, id DESC';
  const { rows } = await query(sql, params);
  return rows;
}
export async function createTx(client, data) {
  const { cuota_id, prestamo_id, monto, fecha_pago, observacion } = data;
  const { rows } = await client.query(
    `INSERT INTO pagos (cuota_id, prestamo_id, monto, fecha_pago, observacion)
     VALUES ($1,$2,$3, COALESCE($4, CURRENT_DATE), $5) RETURNING *`,
    [cuota_id, prestamo_id, monto, fecha_pago, observacion]
  );
  return rows[0];
}