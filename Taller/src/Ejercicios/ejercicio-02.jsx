import "./ejercicio-02.css"
function Ejer02(){
    const nombre = "Edier"
    const edad = 15
    const programa = "Desarrollo de Software"
    const cuidad = "Popayán"
    const lenguaje = "JavaScript"

    return(
        <div className="targeta">
            <h2>{nombre}</h2>
            <p>{edad} Años</p>
            <p>{programa}</p>
            <p>{cuidad}</p>
            <p>{lenguaje}</p>

            <p>En el año que viene trende {edad + 1} años</p>
        </div>
    )
}

export default Ejer02