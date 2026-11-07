import { query } from '../db/index.js';

export async function findAll({ estado, cliente_id } = {}) {
  const params = [];
  let sql = `SELECT p.*, c.nombre AS cliente_nombre
             FROM prestamos p JOIN clientes c ON c.id = p.cliente_id
             WHERE 1=1`;
  if (estado)     { params.push(estado);     sql += ` AND p.estado = $${params.length}`; }
  if (cliente_id) { params.push(cliente_id); sql += ` AND p.cliente_id = $${params.length}`; }
  sql += ' ORDER BY p.created_at DESC';
  const { rows } = await query(sql, params);
  return rows;
}
export async function findById(id) {
  const { rows } = await query(
    `SELECT p.*, c.nombre AS cliente_nombre
     FROM prestamos p JOIN clientes c ON c.id = p.cliente_id
     WHERE p.id = $1`,
    [id]
  );
  return rows[0] ?? null;
}
export async function findCuotasByPrestamo(prestamoId, client = null) {
  const exec = client ? client.query.bind(client) : query;
  const { rows } = await exec(
    'SELECT * FROM cuotas WHERE prestamo_id = $1 ORDER BY numero',
    [prestamoId]
  );
  return rows;
}
export async function update(id, { observacion, estado }) {
  const { rows } = await query(
    `UPDATE prestamos SET
       observacion = COALESCE($1, observacion),
       estado      = COALESCE($2, estado)
     WHERE id = $3 RETURNING *`,
    [observacion, estado, id]
  );
  return rows[0] ?? null;
}
export async function updateEstado(id, estado) {
  const { rows } = await query(
    `UPDATE prestamos SET estado = $1 WHERE id = $2 RETURNING *`,
    [estado, id]
  );
  return rows[0] ?? null;
}

// --- Transaccionales ---
export async function createTx(client, data) {
  const { cliente_id, monto, tasa_pct, n_cuotas, periodicidad,
          fecha_desembolso, fecha_primera_cuota, observacion, total_pagar } = data;
  const { rows } = await client.query(
    `INSERT INTO prestamos
       (cliente_id, monto, tasa_pct, n_cuotas, periodicidad,
        fecha_desembolso, fecha_primera_cuota, observacion,
        total_pagar, saldo, estado)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$9,'ACTIVO')
     RETURNING *`,
    [cliente_id, monto, tasa_pct, n_cuotas, periodicidad,
     fecha_desembolso, fecha_primera_cuota, observacion, total_pagar]
  );
  return rows[0];
}
export async function createCuotaTx(client, cuota) {
  const { prestamo_id, numero, fecha_limite, monto } = cuota;
  const { rows } = await client.query(
    `INSERT INTO cuotas (prestamo_id, numero, fecha_limite, monto)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [prestamo_id, numero, fecha_limite, monto]
  );
  return rows[0];
}
export async function updateSaldoTx(client, id, montoARestar) {
  const { rows } = await client.query(
    `UPDATE prestamos SET saldo = saldo - $1 WHERE id = $2 RETURNING *`,
    [montoARestar, id]
  );
  return rows[0];
}
export async function updateEstadoTx(client, id, estado) {
  const { rows } = await client.query(
    `UPDATE prestamos SET estado = $1 WHERE id = $2 RETURNING *`,
    [estado, id]
  );
  return rows[0];
}