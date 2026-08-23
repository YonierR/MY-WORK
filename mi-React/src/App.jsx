import React from 'react'
import './App.css'
import Perfil from './component/perfil'

function App() {
  const nombre = "luis"
  const [contador, setContador] = React.useState(0)
  return(
    <main className="contenedor">
      <h1>Hola, {nombre}!</h1>
      <p>mi_React</p>
      <p></p>
      <Perfil
      nombre="carlos"
      profesion="Desarrollador"
      imagen="https://name-img.charlies-names.com/name-luis-happy-male.webp"
      />
      <p></p>
      <p>{contador}</p>
      <p></p>
      <button onClick={() => alert('funciona')}>boton</button>
      <p></p>
      <button onClick={() => setContador(contador + 1)}>suma</button>
      <p></p>
      <button onClick={() => setContador(contador - 1)}>resta</button>
    </main>
  )
}

export default App
