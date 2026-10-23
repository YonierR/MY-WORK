import { query } from '../db/index.js';

// GET /api/productos
export const getProductos = async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM productos WHERE activo = TRUE');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/productos
export const createProducto = async (req, res) => {
  const { nombre, precio, id_categoria, id_catalogo } = req.body;
  try {
    const { rows } = await query(
      'INSERT INTO productos (nombre, precio, id_categoria, id_catalogo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, precio, id_categoria, id_catalogo]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};