import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  function aumentar() {
    setContador(valorActual => {
      if (valorActual >= 10) {
        return 10;
      }

      return valorActual + 1;
    });
  }

  function disminuir() {
    setContador(valorActual => {
      if (valorActual <= 0) {
        return 0;
      }

      return valorActual - 1;
    });
  }

  function reiniciar() {
    setContador(0);
  }

  return (
    <div>
      <h2>Contador: {contador}</h2>

      <button
        onClick={disminuir}
        disabled={contador === 0}
      >
        Disminuir
      </button>

      <button
        onClick={aumentar}
        disabled={contador === 10}
      >
        Aumentar
      </button>

      <button onClick={reiniciar}>
        Reiniciar
      </button>

      {contador === 0 && <p>Has llegado al mínimo.</p>}

      {contador === 10 && <p>Has llegado al máximo.</p>}
    </div>
  );
}

export default Contador;