import './App.css'
import Encabezado from './componets/Encabezado'
import Contenido from './componets/Contenido'
import PiePaguina from './componets/PiePaguina'
import Producto from './componets/TargetaProduct'
import Ejer02 from './Ejercicios/ejercicio-02'
import Ejer05 from './Ejercicios/ejercicio-05'
import Contador from './componets/Contador'
import EstadoSesion from './componets/Secion'
import ListaProductos from './componets/lista'
import FormularioEstudiante from './componets/Formulario'
import GestorTareas from './componets/Gestor'

function App() {
  return(
  <div>
    <h1>Taller de React/Vite</h1>
    <h2>Edier Salamanca y Alexis</h2>
    <p>Programa:Desarrollo de Software</p>
    <p></p>
    <p>Espero Mejorar en el uso de React/Vite, yo Edier quiero pollo,"tengo hambre"</p>
    <p></p>
    <p></p>
    <Ejer02/>
    <p></p>
    <p></p>
    <Encabezado/>
    <Contenido/>
    <PiePaguina/>
    <p></p>
    <p></p>
    <div>
      <h1>Productos</h1>
      <p></p>
      <Producto
      nombre="Pony Malta"
      precio = {3000}
      categoria="Insumo"
      stock={30}
      >
        <p>Disponible</p>
        <button>Comprar</button>
      </Producto>
    </div>
    <div>
      <Producto
      nombre="Atun"
      precio={5000}
      categoria="Insumo"
      stock={15}/>
      <p>Disponible</p>
      <button>Comprar</button>
    </div>

    <div>
      <h1>Reto-05</h1>
      <Ejer05/>
    </div>

    <div>
      <h1>Reto 06 -Use State</h1>
      <Contador/>
    </div>

    <div>
      <h1>Reto-07 Estado Sesion</h1>
      <EstadoSesion/>
    </div>

    <div>
      <h1>Reto-08- lista</h1>
      <ListaProductos/>
    </div>

    <div>
      <h1>Reto-09</h1>

      <FormularioEstudiante/>
    </div>
    <div>
      <h1>reto-010 gestor</h1>
      <GestorTareas/>
    </div>
  </div>
  
  
  )
}




export default App
