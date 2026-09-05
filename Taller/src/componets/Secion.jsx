import { useState } from "react";

function EstadoSesion() {
  const [sesionIniciada, setSesionIniciada] = useState(false);

  return (
    <div>
      <h2>
        {sesionIniciada
          ? "Bienvenido"
          : "Debes iniciar sesión"}
      </h2>

      <button
        onClick={() => setSesionIniciada(!sesionIniciada)}
      >
        {sesionIniciada ? "Salir" : "Entrar"}
      </button>

      {sesionIniciada && (
        <p>Tienes mensajes nuevos.</p>
      )}
    </div>
  );
}

export default EstadoSesion;