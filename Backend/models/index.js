import { Usuario } from './Usuario.js';
import { Cliente } from './Cliente.js';
import { Prestamo } from './Prestamo.js';
import { Cuota } from './Cuota.js';
import { Pago } from './Pago.js';
import { Notificacion } from './Notificacion.js';

Usuario.hasMany(Cliente, { foreignKey: 'usuario_id', as: 'clientes' });
Cliente.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

Cliente.hasMany(Prestamo, { foreignKey: 'cliente_id', as: 'prestamos' });
Prestamo.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

Prestamo.hasMany(Cuota, { foreignKey: 'prestamo_id', as: 'cuotas' });
Cuota.belongsTo(Prestamo, { foreignKey: 'prestamo_id', as: 'prestamo' });

Prestamo.hasMany(Pago, { foreignKey: 'prestamo_id', as: 'pagos' });
Pago.belongsTo(Prestamo, { foreignKey: 'prestamo_id', as: 'prestamo' });

Cuota.hasMany(Pago, { foreignKey: 'cuota_id', as: 'pagos' });
Pago.belongsTo(Cuota, { foreignKey: 'cuota_id', as: 'cuota' });

Cuota.hasMany(Notificacion, { foreignKey: 'cuota_id', as: 'notificaciones' });
Notificacion.belongsTo(Cuota, { foreignKey: 'cuota_id', as: 'cuota' });

export { Usuario, Cliente, Prestamo, Cuota, Pago, Notificacion };