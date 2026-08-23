function perfil({nombre, profesion , imagen}){
    
    return (
        <div>
            <h2>{nombre}</h2>
            <p>{profesion}</p>
            <img src={imagen} alt={nombre} />
        </div>
    )
}
export default perfil