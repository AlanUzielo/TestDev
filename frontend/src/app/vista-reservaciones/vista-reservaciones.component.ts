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
  reservaciones: Reservacion[] = [];
  salas: Sala[] = [];
  
  imagen = '';

  constructor(private apiSalas: ApiSalasService, private apiReservas: ApiReservasService){}

  ngOnInit(){
    this.apiReservas.getReservaciones().then((response: any) => {
      console.log(response);
      this.reservaciones = response;
    });
    this.apiSalas.getSalas().then((response: any) => {
      console.log(response);
      this.salas = response;
    });
  }

  getImagen(): string {
    this.imagen = this.apiSalas.getImagen(); 
    return this.imagen;
  }

  getNombreSala(id:number): string {
    let nombre = '';
    this.salas.forEach(sala => {
      if(sala.id_sala == id){
        nombre = sala.nombre;
      }
    });
    return nombre;
  }

  borrarJunta(id:number){
    alertify.confirm('¿Estás seguro de eliminar esta junta?', () => {
      this.apiReservas.borrarJunta(id).then((response: any) => {
        if(response.success == true){
          alertify.success('Junta Eliminada');
          window.location.href = '/reservaciones';
        
        }else{
          alertify.error('No se pudo eliminar la junta');
        }
      });
    }, () => {
      alertify.error('Operación Cancelada');
    });
  }
}
