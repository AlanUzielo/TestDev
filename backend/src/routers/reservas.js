const express = require('express'); // importamos express
const routerReservas = express.Router(); // creamos un router para las reservas
const connection = require('../conexiondb'); // importamos la conexion a la base de datos
const moment = require('moment-timezone'); // importamos moment-timezone

moment.tz.setDefault("America/Mexico_City"); // establecemos la zona horaria de Mexico


// Creacion de reservas con POST
routerReservas.post('/', (req, res) => {
    const {id_sala, fecha_inicio, fecha_fin} = req.body; // obtenemos los datos del body
    console.log("Crear Reserva");
    console.log("ID Sala: "+id_sala, "Fecha Inicio: "+fecha_inicio, "Fecha Fin: "+fecha_fin);
    // creamos la consulta para verificar si la sala esta disponible
    const query = `SELECT * FROM reservacion WHERE id_sala = ${id_sala} AND ((fecha_inicio BETWEEN '${fecha_inicio}' AND '${fecha_fin}') OR (fecha_fin BETWEEN '${fecha_inicio}' AND '${fecha_fin}'))`; 
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            console.log(error);
            res.json({success: false, message: 'Error al verificar la disponibilidad de la sala'});
        } else {

            if(results.length > 0) { // si hay resultados
                // respondemos con un mensaje de error
                res.json({success: false, message: 'La sala ya esta reservada en ese horario'});
            } else {
                // si no hay resultados, creamos la consulta para crear la reserva
                const query = `INSERT INTO reservacion (id_sala, fecha_inicio, fecha_fin) VALUES (${id_sala}, '${fecha_inicio}', '${fecha_fin}')`;
                // ejecutamos la consulta
                connection.query(query, (error, results) => {
                    if(error) { // si hay un error
                        // respondemos con un mensaje de error
                        res.json({success: false, message: 'Error al crear la reserva'});
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
    // revisamos si hay reservas cumplidas para eliminarlas
    revisarReservaCumplida(); 
    // creamos la consulta
    const query = 'SELECT * FROM reservacion';
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.jason({success: false, message: 'Error al obtener las reservas'});
        } else {
            // si no hay errores, respondemos con las reservas obtenidas
            // cambiamos el formato de las fechas
            results = results.map(reserva => {
                reserva.fecha_inicio = moment(reserva.fecha_inicio).format('YYYY-MM-DD HH:mm:ss');
                reserva.fecha_fin = moment(reserva.fecha_fin).format('YYYY-MM-DD HH:mm:ss');
                return reserva;
            });
            res.json(results);
        }
    });
});


// Actualizar una reserva con PUT
routerReservas.put('/:id', (req, res) => {
    const id_rsv = req.params.id; // obtenemos el id de la reserva
    const {id_sala, fecha_inicio, fecha_fin} = req.body; // obtenemos los datos del body
    console.log("Actualizar Reserva");
    console.log("ID Reservacion: "+id_rsv, "ID Sala: "+id_sala, "Fecha Inicio: "+fecha_inicio, "Fecha Fin: "+fecha_fin);
    // creamos la consulta para verificar si la sala esta disponible
    let query = `SELECT * FROM reservacion WHERE id_sala = ${id_sala} AND ((fecha_inicio BETWEEN '${fecha_inicio}' AND '${fecha_fin}') OR (fecha_fin BETWEEN '${fecha_inicio}' AND '${fecha_fin}'))`;
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.json({success: false, message: 'Error al actualizar la reserva'});
            console.log(error);
        } else {
            
            if(results.length > 0) { // si se afecto alguna fila
                // respondemos con un mensaje
                res.json({success: false, message: 'La Sala No Se Encuentra Disponible En Ese Horario'});
            
            }else{ // si no se afecto ninguna fila
                // creamos la consulta para actualizar la reserva
                query = `UPDATE reservacion SET id_sala = ${id_sala}, fecha_inicio = '${fecha_inicio}', fecha_fin = '${fecha_fin}' WHERE id_reservacion = ${id_rsv}`;
                // ejecutamos la consulta
                connection.query(query, (error, results) => {
                    if(error) { // si hay un error
                        // respondemos con un mensaje de error
                        res.json({success: false, message: 'Error al actualizar la reserva'});
                        console.log(error);
                    } else {

                        if(results.affectedRows > 0) { // si se afecto alguna fila
                            // respondemos con un mensaje de exito
                            res.json({success: true, message: 'Reserva actualizada con exito'});
                        } else {
                            // si no se afecto ninguna fila, respondemos con un mensaje de error
                            res.json({success: false, message: 'La reserva no se pudo actualizar'});
                        }
                    }
                });
            }
        }
    });
});


// Eliminar una reserva con DELETE
routerReservas.delete('/:id', (req, res) => {
    const id = req.params.id; // obtenemos el id de la reserva
    // creamos la consulta para eliminar la reserva por su id
    const query = `DELETE FROM reservacion WHERE id_reservacion = ${id}`;
    console.log("Eliminar Reserva con id: " + id); 
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            res.json({success: false, message: 'Error al eliminar la reserva'});
        } else {
            
            if(results.affectedRows > 0) { // si se afecto alguna fila
                // respondemos con un mensaje de exito
                res.json({success: true, message: 'Reserva eliminada con exito'});
            } else {
                // si no se afecto ninguna fila, respondemos con un mensaje de error
                res.json({success: false, message: 'La reserva no existe'});
            }
        }
    });
});


/* funcion para revisar si hay reservas cumplidas y eliminarlas */
function revisarReservaCumplida(){
    // creamos la consulta para obtener todas las reservas
    const query = 'SELECT * FROM reservacion';
    // ejecutamos la consulta
    connection.query(query, (error, results) => {
        if(error) { // si hay un error
            // respondemos con un mensaje de error
            console.log("Error al obtener las reservas");
        } else {
            // si no hay errores, respondemos con las reservas obtenidas
            // cambiamos el formato de las fechas
            results = results.map(reserva => {
                reserva.fecha_inicio = moment(reserva.fecha_inicio).format('YYYY-MM-DD HH:mm:ss');
                reserva.fecha_fin = moment(reserva.fecha_fin).format('YYYY-MM-DD HH:mm:ss');
                return reserva;
            });
            results.forEach(reserva => {
                if(moment(reserva.fecha_fin).isBefore(moment())){
                    console.log("Reserva Cumplida");
                    const query = `DELETE FROM reservacion WHERE id_reservacion = ${reserva.id_reservacion}`;
                    // ejecutamos la consulta
                    connection.query(query, (error, results) => {
                        if(error) { // si hay un error
                            // respondemos con un mensaje de error
                            console.log("Error al eliminar la reserva");
                        } else {
                            // si no hay errores
                            if(results.affectedRows > 0) { // si se afecto alguna fila
                                // respondemos con un mensaje de exito
                                console.log("Reserva eliminada con exito");
                            } else {
                                // si no se afecto ninguna fila, respondemos con un mensaje de error
                                console.log("La reserva no existe");
                            }
                        }
                    });
                }
            });
        }
    });
}


module.exports = routerReservas;