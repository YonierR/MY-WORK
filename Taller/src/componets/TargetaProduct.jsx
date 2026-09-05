function Producto({nombre , precio , categoria , stock , children}){

    return(
        <article>
            <h3>{nombre}</h3>

            <p>{precio}</p>
            <p>{categoria}</p>
            <p>{stock} Disponibles</p>
            {children}
        </article>
    )
}

export default Producto