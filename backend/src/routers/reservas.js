const express = require('express'); // importamos express
const routerReservas = express.Router(); // creamos un router para las reservas
const connection = require('../conexiondb'); // importamos la conexion a la base de datos


// Creacion de reservas con POST
routerReservas.post('/', (req, res) => {
    const {id_sala, fecha_inicio, fecha_fin} = req.body; // obtenemos los datos del body
    // creamos la consulta para verificar si la sala esta disponible
    const query = `SELECT * FROM reservacion WHERE id_sala = ${id_sala} AND (fecha_inicio BETWEEN '${fecha_inicio}' AND '${fecha_fin}' OR fecha_fin BETWEEN '${fecha_inicio}' AND '${fecha_fin}')`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.status(500).json({success: false, message: 'Error al verificar la disponibilidad de la sala'});
        } else {
            if(results.length > 0) { // si hay resultados
                // respondemos con un mensaje de error
                res.status(400).json({success: false, message: 'La sala ya esta reservada en ese horario'});
            } else {
                // si no hay resultados, creamos la consulta para crear la reserva
                const query = `INSERT INTO reservacion (id_sala, fecha_inicio, fecha_fin) VALUES (${id_sala}, '${fecha_inicio}', '${fecha_fin}')`;
                // ejecutamos la consulta
                connection.query(query, (error, results) => {
                    if(error) { // si hay un error
                        // respondemos con un mensaje de error
                        res.status(500).json({success: false, message: 'Error al crear la reserva'});
                    } else {
                        // si no hay errores, respondemos con un mensaje de exito
                        res.json({success: true, message: 'Reserva creada con exito'});
                    }
                });
            }
        }
    });
});


// Obtener todas las reservas con GET
routerReservas.get('/', (req, res) => {
    // creamos la consulta
    const query = 'SELECT * FROM reservacion';
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.status(500).json({success: false, message: 'Error al obtener las reservas'});
        } else {
            // si no hay errores, respondemos con las reservas obtenidas
            res.json(results);
        }
    });
});


// Actualizar una reserva con PUT
routerReservas.put('/:id', (req, res) => {
    const id = req.params.id; // obtenemos el id de la reserva
    const {id_sala, fecha_inicio, fecha_fin} = req.body; // obtenemos los datos del body
    // creamos la consulta
    const query = `UPDATE reservacion SET id_sala = ${id_sala}, fecha_inicio = '${fecha_inicio}', fecha_fin = '${fecha_fin}' WHERE id_reservacion = ${id}`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.status(500).json({success: false, message: 'Error al actualizar la reserva'});
        } else {
            // si no hay errores
            if(results.affectedRows > 0) { // si se afecto alguna fila
                // respondemos con un mensaje de exito
                res.json({success: true, message: 'Reserva actualizada con exito'});
            } else {
                // si no se afecto ninguna fila, respondemos con un mensaje de error
                res.status(404).json({success: false, message: 'La reserva no existe'});
            }
        }
    });
});


// Eliminar una reserva con DELETE
routerReservas.delete('/:id', (req, res) => {
    const id = req.params.id; // obtenemos el id de la reserva
    // creamos la consulta
    const query = `DELETE FROM reservacion WHERE id_reservacion = ${id}`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.status(500).json({success: false, message: 'Error al eliminar la reserva'});
        } else {
            // si no hay errores
            if(results.affectedRows > 0) { // si se afecto alguna fila
                // respondemos con un mensaje de exito
                res.json({success: true, message: 'Reserva eliminada con exito'});
            } else {
                // si no se afecto ninguna fila, respondemos con un mensaje de error
                res.status(404).json({success: false, message: 'La reserva no existe'});
            }
        }
    });
});


module.exports = routerReservas;