import { useState } from "react";

function FormularioEstudiante() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    programa: "",
    jornada: "",
    condiciones: false
  });

  const [errores, setErrores] = useState({});
  const [resumen, setResumen] = useState(null);

  function manejarCambio(evento) {
    const { name, value, type, checked } = evento.target;

    const nuevoValor = type === "checkbox"
      ? checked
      : value;

    setFormulario(datos => ({
      ...datos,
      [name]: nuevoValor
    }));
  }

  function validarFormulario() {
    const nuevosErrores = {};

    if (formulario.nombre.trim().length < 3) {
      nuevosErrores.nombre =
        "El nombre debe tener mínimo 3 caracteres.";
    }

    if (!formulario.correo.includes("@")) {
      nuevosErrores.correo =
        "El correo debe contener @.";
    }

    if (!formulario.condiciones) {
      nuevosErrores.condiciones =
        "Debes aceptar las condiciones.";
    }

    return nuevosErrores;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevosErrores = validarFormulario();

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    setResumen(formulario);

    setFormulario({
      nombre: "",
      correo: "",
      programa: "",
      jornada: "",
      condiciones: false
    });
  }

  return (
    <div>
      <h2>Registro de estudiante</h2>

      <form onSubmit={manejarEnvio}>

        <div>
          <label>Nombre:</label>

          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
          />

          {errores.nombre && (
            <p>{errores.nombre}</p>
          )}
        </div>

        <div>
          <label>Correo:</label>

          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
          />

          {errores.correo && (
            <p>{errores.correo}</p>
          )}
        </div>

        <div>
          <label>Programa:</label>

          <input
            type="text"
            name="programa"
            value={formulario.programa}
            onChange={manejarCambio}
          />
        </div>

        <div>
          <label>Jornada:</label>

          <select
            name="jornada"
            value={formulario.jornada}
            onChange={manejarCambio}
          >
            <option value="">Selecciona una jornada</option>
            <option value="Diurna">Diurna</option>
            <option value="Nocturna">Nocturna</option>
          </select>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="condiciones"
              checked={formulario.condiciones}
              onChange={manejarCambio}
            />

            Acepto las condiciones
          </label>

          {errores.condiciones && (
            <p>{errores.condiciones}</p>
          )}
        </div>

        <button type="submit">
          Registrar
        </button>

      </form>

      {resumen && (
        <div>
          <h3>Registro realizado</h3>

          <p>Nombre: {resumen.nombre}</p>
          <p>Correo: {resumen.correo}</p>
          <p>Programa: {resumen.programa}</p>
          <p>Jornada: {resumen.jornada}</p>
        </div>
      )}
    </div>
  );
}

export default FormularioEstudiante;