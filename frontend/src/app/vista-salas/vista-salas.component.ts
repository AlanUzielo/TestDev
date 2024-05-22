import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiSalasService } from '../api-salas.service';
import { Sala } from '../sala.model';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-vista-salas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vista-salas.component.html',
  styleUrl: './vista-salas.component.css'
})
export class VistaSalasComponent implements OnInit{

  // Se define un arreglo de salas
  salas: Sala[] = [];
  // Se define una variable para almacenar la imagen de la sala
  imagen: string = '';

  // Se inyecta el servicio de ApiSalasService
  constructor(private apiSalas: ApiSalasService){}

  /*
    Método que se ejecuta al iniciar el componente
    Se obtienen las salas a partir del servicio
  */  
  ngOnInit() {
    this.apiSalas.getSalas().then((response: any) => {
      this.salas = response; // Se asignan las salas al arreglo
    });
  }

  // Método para saber si existen salas
  existenSalas(): boolean {
    if (this.salas.length > 0) {
      return true;
    }
    return false;
  }

  // Método para obtener la imagen de la sala
  getImagen(): string{
    this.imagen = this.apiSalas.getImagen();
    return this.imagen;
  }


  // Método para borrar una sala, recibe el id de la sala
  borrarSala(id:number){
    alertify.confirm('¿Estás seguro de eliminar esta sala?', () => {
      this.apiSalas.borrarSala(id).then((response: any) => {
        if(response.success == true){
          alertify.success('Sala Eliminada');
          window.location.href = '/salas';
        }else{
          alertify.error(response.message);
        }
      });
    }, () => {
      alertify.error('Operación Cancelada');
    });
  } 
}
