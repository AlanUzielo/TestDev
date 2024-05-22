const express = require('express'); // importamos express
const routerSalas = express.Router(); // creamos un router para las salas
const connection = require('../conexiondb'); // importamos la conexion a la base de datos


// Creacion de salas con POST
routerSalas.post('/', (req, res) => {
    const {nombre, ubicacion, capacidad} = req.body; // obtenemos los datos del body
    console.log("Crear Sala");
    console.log("Nombre: "+nombre, "Ubicacion: "+ubicacion, "Capacidad: "+capacidad);
    // creamos la consulta para insertar una sala
    const query = `INSERT INTO sala (nombre, ubicacion, capacidad) VALUES ('${nombre}', '${ubicacion}', ${capacidad})`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.json({success: false, message: 'Error al crear la sala'});
        } else {
            // si no hay errores, respondemos con un mensaje de exito
            res.json({success: true, message: 'Sala creada con exito'});
        }
    });
});


// Obtener todas las salas con GET
routerSalas.get('/', (req, res) => {
    // creamos la consulta para obtener todas las salas
    const query = 'SELECT * FROM sala';
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.json({success: false, message: 'Error al obtener las salas'});
        } else {
            // si no hay errores, respondemos con las salas obtenidas
            res.json(results);
        }
    });
});


// Obtener una sala con GET
routerSalas.get('/:id', (req, res) => {
    const id = req.params.id; // obtenemos el id de los parametros
    // creamos la consulta para obtener una sala por su id
    const query = `SELECT * FROM sala WHERE id_sala = ${id}`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.json({success: false, message: 'Error al obtener la sala'});
        } else {

            if(results.length > 0) { // si hay resultados
                // respondemos con la sala obtenida
                res.json(results[0]);
            
            } else {
                // si no hay resultados, respondemos con un mensaje de error
                res.json({success: false, message: 'La sala no existe'});
            }
        }
    });
});


// Actualizar una sala con PUT
routerSalas.put('/:id', (req, res) => {
    const id = req.params.id; // obtenemos el id de los parametros
    const {nombre, ubicacion, capacidad} = req.body; // obtenemos los datos del body
    console.log("Actualizar Sala "+id);
    console.log("Nombre: "+nombre, "Ubicacion: "+ubicacion, "Capacidad: "+capacidad);
    // creamos la consulta para actualizar una sala por su id
    const query = `UPDATE sala SET nombre = '${nombre}', ubicacion = '${ubicacion}', capacidad = ${capacidad} WHERE id_sala = ${id}`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.json({success: false, message: 'Error al actualizar la sala'});
        } else {
            
            if(results.affectedRows > 0) { // si se afecto alguna fila
                // respondemos con un mensaje de exito
                res.json({success: true, message: 'Sala actualizada con exito'});
            } else {
                // si no se afecto ninguna fila, respondemos con un mensaje de error
                res.json({success: false, message: 'La sala no existe'});
            }
        }
    });
});


// Eliminar una sala con DELETE
routerSalas.delete('/:id', (req, res) => {
    const id = req.params.id; // obtenemos el id de los parametros
    console.log("Eliminar Sala "+id);
    // creamos la consulta para obtener las reservas asociadas a la sala
    let query = `SELECT * FROM reservacion WHERE id_sala = ${id}`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.status(500).json({success: false, message: 'Se encontró un error'});
        } else {
            
            if(results.length > 0) { // si se afecto alguna fila
                // creamos la consulta para eliminar las reservas asociadas a la sala
                query = `DELETE FROM reservacion WHERE id_sala = ${id}`;
                connection.query(query, (error, results) => {
                    if(error) { // si hay un error
                        // respondemos con un mensaje de error
                        res.json({success: false, message: 'Error al eliminar la reserva de la sala'});
                    } else {
                        
                        if(results.affectedRows > 0) { // si se afecto alguna fila
                            // creamos la consulta para eliminar la sala por su id
                            query = `DELETE FROM sala WHERE id_sala = ${id}`;
                            connection.query(query, (error, results) => {
                                if(error) { // si hay un error
                                    // respondemos con un mensaje de error
                                    res.json({success: false, message: 'Error al eliminar la sala'});
                                } else {
                                    
                                    if(results.affectedRows > 0) { // si se afecto alguna fila
                                        // respondemos con un mensaje de exito
                                        res.json({success: true, message: 'Sala eliminada con exito'});
                                    } else {
                                        // si no se afecto ninguna fila, respondemos con un mensaje de error
                                        res.json({success: false, message: 'La sala no existe'});
                                    }
                                }
                            });
                        } else {
                            // si no se afecto ninguna fila, respondemos con un mensaje de error
                            res.json({success: false, message: 'La reserva no existe'});
                        }
                    }
                });
            } else {
                // no existen reservas asociadas a la sala
                // creamos la consulta para eliminar la sala por su id
                query = `DELETE FROM sala WHERE id_sala = ${id}`;
                connection.query(query, (error, results) => {
                    if(error) { // si hay un error
                        // respondemos con un mensaje de error
                        res.json({success: false, message: 'Error al eliminar la sala'});
                    } else {
                        
                        if(results.affectedRows > 0) { // si se afecto alguna fila
                            // respondemos con un mensaje de exito
                            res.json({success: true, message: 'Sala eliminada con exito'});
                        } else {
                            // si no se afecto ninguna fila, respondemos con un mensaje de error
                            res.json({success: false, message: 'La sala no existe'});
                        }
                    }
                });
            }
        }
    });
});


module.exports = routerSalas; // exportamos el router de salas