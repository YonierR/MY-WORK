import { Op, fn, col, literal } from 'sequelize';
import { sequelize } from '../db/sequelize.js';
import { Prestamo, Pago, Cliente } from '../models/index.js';

export async function obtenerDashboard() {
  // 1. Totales generales (Prestado, Recibido, Pendiente)
  const stats = await Prestamo.findOne({
    attributes: [
      [fn('COALESCE', fn('SUM', col('total_pagar')), 0), 'total_prestado'],
      [fn('COALESCE', fn('SUM', col('saldo')), 0), 'total_pendiente'],
    ],
    where: { estado: { [Op.ne]: 'CANCELADO' } },
    raw: true,
  });

  const dinero_prestado = Number(stats.total_prestado);
  const pendiente = Number(stats.total_pendiente);
  const recibido = Number((dinero_prestado - pendiente).toFixed(2));

  // 2. Crecimiento respecto al mes pasado
  const ahora = new Date();
  const mesActual = ahora.getMonth();
  const anioActual = ahora.getFullYear();
  
  // Primer día de este mes y del mes pasado
  const inicioMesActual = new Date(anioActual, mesActual, 1).toISOString();
  const inicioMesPasado = new Date(anioActual, mesActual - 1, 1).toISOString();
  const finMesPasado = new Date(anioActual, mesActual, 0, 23, 59, 59).toISOString();

  // Suma de préstamos creados este mes vs mes pasado
  const [prestamosMesActual, prestamosMesPasado] = await Promise.all([
    Prestamo.sum('total_pagar', { where: { created_at: { [Op.gte]: inicioMesActual } } }),
    Prestamo.sum('total_pagar', { where: { created_at: { [Op.between]: [inicioMesPasado, finMesPasado] } } }),
  ]);

  const totalActual = Number(prestamosMesActual) || 0;
  const totalPasado = Number(prestamosMesPasado) || 0;
  
  let crecimiento_pct = 0;
  if (totalPasado > 0) {
    crecimiento_pct = Number((((totalActual - totalPasado) / totalPasado) * 100).toFixed(1));
  } else if (totalActual > 0) {
    crecimiento_pct = 100; // Si el mes pasado fue 0, el crecimiento es 100%
  }

  // 3. Actividad reciente (Últimos 5 movimientos mezclando pagos y préstamos)
  const [ultimosPagos, ultimosPrestamos] = await Promise.all([
    Pago.findAll({
      limit: 5,
      order: [['fecha_pago', 'DESC'], ['id', 'DESC']],
      include: [{
        model: Prestamo,
        as: 'prestamo',
        attributes: ['id'],
        include: [{ model: Cliente, as: 'cliente', attributes: ['nombre'] }]
      }]
    }),
    Prestamo.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      include: [{ model: Cliente, as: 'cliente', attributes: ['nombre'] }]
    })
  ]);

  // Formatear actividad
  const actividad = [
    ...ultimosPagos.map(p => ({
      tipo: 'PAGO',
      cliente: p.prestamo?.cliente?.nombre || 'Cliente',
      monto: Number(p.monto),
      descripcion: 'Pago recibido',
      fecha: p.fecha_pago,
      timestamp: new Date(p.fecha_pago).getTime()
    })),
    ...ultimosPrestamos.map(p => ({
      tipo: 'PRESTAMO',
      cliente: p.cliente?.nombre || 'Cliente',
      monto: Number(p.monto),
      descripcion: 'Nuevo préstamo',
      fecha: p.created_at,
      timestamp: new Date(p.created_at).getTime()
    }))
  ]
  .sort((a, b) => b.timestamp - a.timestamp) // Ordenar del más reciente al más antiguo
  .slice(0, 5); // Tomar solo los 5 primeros

  return {
    metricas: {
      dinero_prestado,
      recibido,
      pendiente,
      crecimiento_pct
    },
    actividad_reciente: actividad
  };
}