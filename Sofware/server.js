import express from 'express';
import cors from 'cors';
import productosRouter from './routes/Productos.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares esenciales
app.use(cors()); // Permite peticiones desde tu frontend
app.use(express.json()); // Para parsear los body en JSON

// Montar las rutas de la API
app.use('/api/productos', productosRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Productos',
    endpoints: {
      productos: '/api/productos',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' ,
    ruta: req.originalUrl,
   });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});