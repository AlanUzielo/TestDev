const mysql = require('mysql2'); // importamos mysql2

// Creamos la conexion a la base de datos
const connection = mysql.createConnection({
    host: 'localhost', // host de la base de datos
    user: 'root', // usuario de la base de datos
    password: '12345', // contraseña de la base de datos
    database: 'juntas', // nombre de la base de datos
    port: 3307 // puerto de la base de datos
});

// Creamos la conexion a la base de datos
connection.connect((err) => {
    if (err) { // si hay un error
        console.log('Error al conectar a la base de datos');
        return; // terminamos la ejecucion
    }
    // si no hay errores
    console.log('Conectado a la base de datos'); 
});

// Exportamos la conexion para poder usarla en otros archivos
module.exports = connection;