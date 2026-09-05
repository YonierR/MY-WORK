function Ejer05(){
    function Click(){
        alert("Hola React")
    }

    function cambio(evento){
        console.log(evento.taget.value)
    }

    function Envio(evento){
        evento.preventDefault()
        alert("Formulario envio")
    }

    return(
        <div>
            <h2>Manejo Eventos</h2>
            <button onClick={Click}>Saludar</button>
            <br />
            <br />

            <input 
            type="text" 
            placeholder="Escribe algo"
            onChange={cambio}/>
            <br />
            <br />
            <form onSubmit={Envio}>
                <input type="text"
                placeholder="nombre" />
                <button type="summit">Enviar</button>
            </form>
        </div>

    )
}

export default Ejer05