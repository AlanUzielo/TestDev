import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservacion } from './reservacion.model';

@Injectable({
  providedIn: 'root'
})

/*
  Servicio para la comunicación con la API de reservaciones
  Tiene métodos para obtener todas las reservaciones, crear 
  una reservación, actualizar una reservación y borrar una 
  reservación
*/
export class ApiReservasService {

  // Se inyecta el módulo HttpClient para realizar peticiones HTTP
  constructor(private http:HttpClient) { }


  // Método para obtener todas las reservaciones
  getReservaciones(){
    return this.http.get('http://localhost:3000/reservas').toPromise();
  }


  // Método para obtener una reservación por su id
  crearReserva(rsv: Reservacion){
    // Se obtiene la fecha de inicio y fin en el formato YYYY-MM-DD HH:MM:SS
    const fecha_inicio = rsv.fecha_inicio.getFullYear()+'-'+(rsv.fecha_inicio.getMonth()+1)+'-'+rsv.fecha_inicio.getDate()+' '+rsv.fecha_inicio.getHours()+':'+rsv.fecha_inicio.getMinutes()+':00' 
    const fecha_fin = rsv.fecha_fin.getFullYear()+'-'+(rsv.fecha_fin.getMonth()+1)+'-'+rsv.fecha_fin.getDate()+' '+rsv.fecha_fin.getHours()+':'+rsv.fecha_fin.getMinutes()+':00'
    // Se crea un objeto con los datos de la reservación
    const reservacion = {
      id_sala: rsv.id_sala, // Se asigna el id de la sala
      fecha_inicio: fecha_inicio, // Se asigna la fecha de inicio
      fecha_fin: fecha_fin  // Se asigna la fecha de fin
    }

    // Se realiza una petición POST a la API para crear una reservación
    return this.http.post('http://localhost:3000/reservas', reservacion).toPromise();
  }


  // Método para actualizar una reservación
  actualizarReserva(rsv: Reservacion){
    // Se obtiene la fecha de inicio y fin en el formato YYYY-MM-DD HH:MM:SS
    const fecha_inicio = rsv.fecha_inicio.getFullYear()+'-'+(rsv.fecha_inicio.getMonth()+1)+'-'+rsv.fecha_inicio.getDate()+' '+rsv.fecha_inicio.getHours()+':'+rsv.fecha_inicio.getMinutes()+':00' 
    const fecha_fin = rsv.fecha_fin.getFullYear()+'-'+(rsv.fecha_fin.getMonth()+1)+'-'+rsv.fecha_fin.getDate()+' '+rsv.fecha_fin.getHours()+':'+rsv.fecha_fin.getMinutes()+':00'
    // Se crea un objeto con los datos de la reservación
    const reservacion = {
      id_reservacion: rsv.id_reservacion, // Se asigna el id de la reservación
      id_sala: rsv.id_sala, // Se asigna el id de la sala
      fecha_inicio: fecha_inicio, // Se asigna la fecha de inicio
      fecha_fin: fecha_fin // Se asigna la fecha de fin
    }

    // Se realiza una petición PUT a la API para actualizar una reservación
    return this.http.put('http://localhost:3000/reservas/'+rsv.id_reservacion, reservacion).toPromise();
  }

  // Método para borrar una reservación
  borrarJunta(id:number){
    return this.http.delete('http://localhost:3000/reservas/'+id).toPromise();
  }
}
