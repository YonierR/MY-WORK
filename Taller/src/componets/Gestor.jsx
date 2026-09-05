import { useState } from "react";

function GestorTareas() {
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  function agregarTarea(evento) {
    evento.preventDefault();

    const texto = nuevaTarea.trim();

    if (texto === "") {
      return;
    }

    const tareaRepetida = tareas.some(
      tarea => tarea.texto.toLowerCase() === texto.toLowerCase()
    );

    if (tareaRepetida) {
      return;
    }

    setTareas(actuales => [
      ...actuales,
      {
        id: Date.now(),
        texto: texto,
        completada: false
      }
    ]);

    setNuevaTarea("");
  }

  function cambiarCompletada(id) {
    setTareas(actuales =>
      actuales.map(tarea =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    );
  }

  function eliminarTarea(id) {
    setTareas(actuales =>
      actuales.filter(tarea => tarea.id !== id)
    );
  }

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === "pendientes") {
      return !tarea.completada;
    }

    if (filtro === "completadas") {
      return tarea.completada;
    }

    return true;
  });

  const pendientes = tareas.filter(
    tarea => !tarea.completada
  ).length;

  const completadas = tareas.filter(
    tarea => tarea.completada
  ).length;

  return (
    <div>
      <h2>Gestor de tareas</h2>

      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={evento => setNuevaTarea(evento.target.value)}
          placeholder="Escribe una tarea"
        />

        <button type="submit">
          Agregar
        </button>
      </form>

      <div>
        <button onClick={() => setFiltro("todas")}>
          Todas ({tareas.length})
        </button>

        <button onClick={() => setFiltro("pendientes")}>
          Pendientes ({pendientes})
        </button>

        <button onClick={() => setFiltro("completadas")}>
          Completadas ({completadas})
        </button>
      </div>

      <ul>
        {tareasFiltradas.map(tarea => (
          <li key={tarea.id}>
            <span>
              {tarea.completada ? "✅ " : "⬜ "}
              {tarea.texto}
            </span>

            <button
              onClick={() => cambiarCompletada(tarea.id)}
            >
              {tarea.completada
                ? "Pendiente"
                : "Completar"}
            </button>

            <button
              onClick={() => eliminarTarea(tarea.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestorTareas;