import express from 'express';
import { notFound }     from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
import dotenv from 'dotenv';

import clientesRouter       from './routes/clientes.js';
import prestamosRouter      from './routes/prestamos.js';
import cuotasRouter         from './routes/cuotas.js';
import pagosRouter          from './routes/pagos.js';
import notificacionesRouter from './routes/notificaciones.js';
import usuariosRouter       from './routes/usuarios.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Préstamos funcionando 🚀',
    endpoints: {
      clientes:       '/api/clientes',
      prestamos:      '/api/prestamos',
      cuotas:         '/api/cuotas',
      pagos:          '/api/pagos',
      notificaciones: '/api/notificaciones',
      usuarios:       '/api/usuarios',
    },
  });
});

app.use('/api/clientes',       clientesRouter);
app.use('/api/prestamos',      prestamosRouter);
app.use('/api/cuotas',         cuotasRouter);
app.use('/api/pagos',          pagosRouter);
app.use('/api/notificaciones', notificacionesRouter);
app.use('/api/usuarios',       usuariosRouter);

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);


app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));