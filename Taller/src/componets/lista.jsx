import { useState } from "react";

const productos = [
  {
    id: 1,
    nombre: "Teclado",
    precio: 120000,
    categoria: "Periféricos",
    disponible: true
  },
  {
    id: 2,
    nombre: "Mouse",
    precio: 65000,
    categoria: "Periféricos",
    disponible: false
  },
  {
    id: 3,
    nombre: "Monitor",
    precio: 850000,
    categoria: "Pantallas",
    disponible: true
  },
  {
    id: 4,
    nombre: "Audífonos",
    precio: 180000,
    categoria: "Audio",
    disponible: true
  },
  {
    id: 5,
    nombre: "Webcam",
    precio: 220000,
    categoria: "Cámaras",
    disponible: false
  }
];

function ListaProductos() {
  const [mostrarDisponibles, setMostrarDisponibles] = useState(false);

  const productosVisibles = mostrarDisponibles
    ? productos.filter(producto => producto.disponible)
    : productos;

  const total = productosVisibles.reduce(
    (acumulado, producto) => acumulado + producto.precio,
    0
  );

  return (
    <div>
      <h2>Lista de productos</h2>

      <button
        onClick={() => setMostrarDisponibles(!mostrarDisponibles)}
      >
        {mostrarDisponibles
          ? "Mostrar todos"
          : "Mostrar disponibles"}
      </button>

      <p>Valor total: ${total}</p>

      {productosVisibles.map(producto => (
        <article key={producto.id}>
          <h3>{producto.nombre}</h3>

          <p>Precio: ${producto.precio}</p>

          <p>Categoría: {producto.categoria}</p>

          <p>
            {producto.disponible
              ? "Disponible"
              : "Agotado"}
          </p>
        </article>
      ))}

      {productosVisibles.length === 0 && (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default ListaProductos;