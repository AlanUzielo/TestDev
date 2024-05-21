import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservacion } from './reservacion.model';

@Injectable({
  providedIn: 'root'
})
export class ApiReservasService {

  constructor(private http:HttpClient) { }

  getReservaciones(){
    return this.http.get('http://localhost:3000/reservas').toPromise();
  }

  crearReserva(rsv: Reservacion){
    const fecha_inicio = rsv.fecha_inicio.getFullYear()+'-'+(rsv.fecha_inicio.getMonth()+1)+'-'+rsv.fecha_inicio.getDate()+' '+rsv.fecha_inicio.getHours()+':'+rsv.fecha_inicio.getMinutes()+':00' 
    const fecha_fin = rsv.fecha_fin.getFullYear()+'-'+(rsv.fecha_fin.getMonth()+1)+'-'+rsv.fecha_fin.getDate()+' '+rsv.fecha_fin.getHours()+':'+rsv.fecha_fin.getMinutes()+':00'
    const reservacion = {
      id_sala: rsv.id_sala,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin
    }

    return this.http.post('http://localhost:3000/reservas', reservacion).toPromise();
  }

  actualizarReserva(rsv: Reservacion){
    const fecha_inicio = rsv.fecha_inicio.getFullYear()+'-'+(rsv.fecha_inicio.getMonth()+1)+'-'+rsv.fecha_inicio.getDate()+' '+rsv.fecha_inicio.getHours()+':'+rsv.fecha_inicio.getMinutes()+':00' 
    const fecha_fin = rsv.fecha_fin.getFullYear()+'-'+(rsv.fecha_fin.getMonth()+1)+'-'+rsv.fecha_fin.getDate()+' '+rsv.fecha_fin.getHours()+':'+rsv.fecha_fin.getMinutes()+':00'
    const reservacion = {
      id_reservacion: rsv.id_reservacion,
      id_sala: rsv.id_sala,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin
    }

    return this.http.put('http://localhost:3000/reservas/'+rsv.id_reservacion, reservacion).toPromise();
  }



  borrarJunta(id:number){
    return this.http.delete('http://localhost:3000/reservas/'+id).toPromise();
  }
}
