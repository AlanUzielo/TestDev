const express = require('express'); // importamos express
const app = express(); // inicializamos express
const port = process.env.PORT || 3000; // purto asignado por el host o 3000

app.use(express.json()); // para poder usar json en las peticiones

// Routers
const salasRouter = require('./src/routers/salas.js');// importamos el router de salas
app.use('/salas', salasRouter); // usamos el router de salas

const reservasRouter = require('./src/routers/reservas.js'); // importamos el router de reservas
app.use('/reservas', reservasRouter); // usamos el router de reservas


// Raiz de la aplicacion
app.get('/', (req, res) => {
    res.send('...');    
});

// Servidor escuchando en el puerto definido
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = app; // exportamos la aplicacion 