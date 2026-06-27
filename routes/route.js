const espress = require('express');
const router = espress.Router();
const modelo = require('../Model/modelo');


router.get('/', (req, res) => {
    res.send('Ruta principal');
});


router.get('/Suma/:n1/:n2', (req, res) => {
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    const resultado = n1 + n2;
    res.send(`la suma de ${n1} y ${n2} es ${resultado}`);
});

router.get('/par/:numero', (req, res) => {
    const numero = Number(req.params.numero);

    if (numero % 2 === 0) {
        res.send(`El número ${numero} es par`);
    } else {
        res.send(`El número ${numero} es impar`);
    }
});

router.get('/adulto/:edad', (req, res) => {
    const edad = Number(req.params.edad);
    if (edad >= 18) {
        res.send(`Es un adulto con ${edad} años`);
    }else if(edad <= 13){
        res.send(`Es un niño con ${edad} años`);
    }else{
        res.send(`Es un adolescente con ${edad} años`);
    }
});

router.get('/Calificacion/:nota', (req, res) => {
    const nota = Number(req.params.nota);
    if (nota >= 4.0) {
        res.send(`aprobado con una nota excelente de ${nota}`);
    } else if(nota < 3.0){
        res.send(`Reprobado con ${nota}`);
    }else{
        res.send(`pasa con ${nota}`);
    }
});

// Aqui hice get para lo esquemas de mongoose pero ps aun no los he probado, no se si esten bien, pero bueno, ahi estan.
//aun me custa usar thunderclient para subir esquemas y ensima no me funciona el mongoose.
//Pstt, Que pase bien estas Vacasiones.

//intento probar iniciar el servidor pero no me funciona mongoose, es mas un error de los servicios de mi PC,creo.
//como sea el codigo esta bien, más no lo pude probar.

router.get('/todos', async (req, res) => {
    try{
        const route = await modelo.find();
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/disponibles/todos', async (req, res) => {
    try{
        const route = await modelo.find({
            disponible: true
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/disponibles/No', async (req, res) => {
    try{
        const route = await modelo.find({
            disponible: false
        });
        res.json(route);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/disponibles_busqueda', async (req, res) => {
    try{
        const route = await modelo.find({
            disponible: req.body.disponible
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/categoria/:categoria', async (req, res) => {

    try {
        const route = await modelo.find({
            categoria: req.params.categoria
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/categoria/:categoria/disponibles', async (req, res) => {
    try {
        const route = await modelo.find({
            categoria: req.params.categoria,
            disponible: true
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/categoria/:categoria/No_disponibles', async (req, res) => {
    try {
        const route = await modelo.find({
            categoria: req.params.categoria,
            disponible: false
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/nombre/:nombre', async (req, res) => {
    try {
        const route = await modelo.find({
            nombre: req.params.nombre
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/precio/:precio', async (req, res) => {
    try {
        const route = await modelo.find({
            precio: Number(req.params.precio)
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/crear', async (req, res) => {
    try {
        const route = new modelo(req.body);
        await route.save();
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.post('/creados', async (req, res) => {
    try {
        const route = await modelo.find(req.body);
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/todos/categoria', async (req, res) => {
    try {
        const route = await modelo.find({
            categoria: req.body.categoria
        });
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/todos/:id', async (req, res) => {
    try {
        const route = await modelo.findById(req.params.id);
        res.json(route);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.send(`Hola, ${nombre}`);
});

module.exports = router;