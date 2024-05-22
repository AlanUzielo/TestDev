import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as alertify from 'alertifyjs';
import { Reservacion } from '../reservacion.model';
import { ApiReservasService } from '../api-reservas.service';


@Component({
  selector: 'app-vista-reservacion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vista-reservacion.component.html',
  styleUrl: './vista-reservacion.component.css'
})
export class VistaReservacionComponent implements OnInit{

  // Se define una variable de tipo Reservacion
  reservacion: Reservacion = {id_reservacion: 0, id_sala: 0, fecha_inicio: new Date(), fecha_fin: new Date()};
  // Se define una variable para almacenar la imagen de la sala
  imagen: string = '';
  // Se define una variable para almacenar el nombre de la sala
  nombreSala: string = '';


  // Se inyecta el servicio de ApiReservasService
  constructor(private rutaActiva: ActivatedRoute, private apiReservas: ApiReservasService) { }


  /*
    Método que se ejecuta al iniciar el componente
    Se obtienen los datos de la reservación a partir de la ruta activa
  */
  ngOnInit(){
    this.reservacion = {
      id_reservacion: this.rutaActiva.snapshot.params['id_reservacion'],
      id_sala: this.rutaActiva.snapshot.params['id_sala'],
      fecha_inicio: this.rutaActiva.snapshot.params['fecha_inicio'],
      fecha_fin: this.rutaActiva.snapshot.params['fecha_fin']
    }

    this.imagen = this.rutaActiva.snapshot.params['imagen'];
    this.nombreSala = this.rutaActiva.snapshot.params['nombre'];
  }
  

  /* Metodo para borrar una reservación, recibe el id de la reservación
      y muestra una alerta de confirmación para
      llamar al servicio y borrar la reservación
    */
  borrarJunta(id:number){
    alertify.confirm('¿Estás seguro de eliminar esta junta?', () => {
      this.apiReservas.borrarJunta(id).then((response: any) => {
        if(response.success == true){
          alertify.success('Junta Eliminada');
          window.location.href = '/reservaciones';
        
        }else{
          alertify.error(response.message);
        }
      });
    }, () => {
      alertify.error('Operación Cancelada');
    });
  }
}
