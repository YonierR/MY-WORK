import './App.css'
import perfil from './component/perfil'

function App() {
  const nombre = "luis"
  return(
    <main className="contenedor">
      <h1>Hola, {nombre}!</h1>
      <p>mi_React</p>
      <p></p>
      <perfil
      nombre="carlos"
      profesion="Desarrollador"
      imagen="https://name-img.charlies-names.com/name-luis-happy-male.webp"
      />
      <button onClick={() => alert('funciona')}>boton</button>
    </main>
  )
}

export default App
