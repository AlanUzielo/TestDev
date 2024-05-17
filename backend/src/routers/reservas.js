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





routerReservas.get('/', (req, res) => {
    
});


module.exports = routerReservas;