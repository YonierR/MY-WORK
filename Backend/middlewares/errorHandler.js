export function errorHandler(err, req, res, next) {
  // 1) Errores de negocio lanzados por services con err.status
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  // 2) Errores de PostgreSQL → 400 (mismo status que tenías en create/update)
  if (['23505', '23503', '23514', '23502', '22P02'].includes(err.code)) {
    return res.status(400).json({ error: err.message });
  }
  // 3) Desconocido → 500
  console.error('[errorHandler]', err);
  res.status(500).json({ error: err.message || 'Error interno' });
}