import { Component, Input, OnInit } from '@angular/core';
import { Reservacion } from '../reservacion.model';
import { CommonModule } from '@angular/common';
import { ApiSalasService } from '../api-salas.service';
import { RouterLink } from '@angular/router';
import { ApiReservasService } from '../api-reservas.service';
import * as alertify from 'alertifyjs';
import { Sala } from '../sala.model';

@Component({
  selector: 'app-vista-reservaciones',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vista-reservaciones.component.html',
  styleUrl: './vista-reservaciones.component.css'
})

export class VistaReservacionesComponent implements OnInit{
  // Se define un arreglo de reservaciones
  reservaciones: Reservacion[] = [];
  // Se define un arreglo de salas
  salas: Sala[] = [];
  
  imagen = ''; // Se define una variable para almacenar la imagen de la sala

  // Se inyectan los servicios de ApiSalasService y ApiReservasService
  constructor(private apiSalas: ApiSalasService, private apiReservas: ApiReservasService){}

  /*
    Método que se ejecuta al iniciar el componente
    Se obtienen todas las reservaciones y salas
  */
  ngOnInit(){
    // Se obtienen todas las reservaciones
    this.apiReservas.getReservaciones().then((response: any) => {
      this.reservaciones = response;
    });

    // Se obtienen todas las salas
    this.apiSalas.getSalas().then((response: any) => {
      console.log(response);
      this.salas = response;
    });
  }

  // Método para obtener una imagen aleatoria de salas
  getImagen(): string {
    this.imagen = this.apiSalas.getImagen(); 
    return this.imagen;
  }


  /* Se define un método para obtener el nombre de la sala
      a partir de su id */
  getNombreSala(id:number): string {
    let nombre = ''; // Se define una variable para almacenar el nombre de la sala
    // Se recorren todas las salas
    this.salas.forEach(sala => {
      if(sala.id_sala == id){ // Si el id de la sala es igual al id recibido
        nombre = sala.nombre; // Se asigna el nombre de la sala a la variable nombre
      }
    });
    return nombre; // Se retorna el nombre de la sala
  }


  /* Metodo para borrar, recibe el id de la junta a borrar 
     y se le pregunta al usuario si está seguro de eliminarla
     para posteriormente llamar al servicio y borrar la junta
  */
  borrarJunta(id:number){
    alertify.confirm('¿Estás seguro de eliminar esta junta?', () => {
      this.apiReservas.borrarJunta(id).then((response: any) => {
        if(response.success == true){
          alertify.alert('Junta Eliminada');
          // Se redirige a la página de reservaciones
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
