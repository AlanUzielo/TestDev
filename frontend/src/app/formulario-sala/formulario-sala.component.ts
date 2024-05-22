import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sala } from '../sala.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiSalasService } from '../api-salas.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-formulario-sala',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-sala.component.html',
  styleUrl: './formulario-sala.component.css'
})
export class FormularioSalaComponent implements OnInit{

  // Se define una variable de tipo Sala
  sala:  Sala = {id_sala: 0, nombre: '', ubicacion: '', capacidad: 0};
  // Se define una variable para almacenar la imagen de la sala
  imagen: string = '';
  // Se define una variable para saber si es una nueva sala
  nuevaSala: boolean = false;

  // Se inyecta el servicio de ApiSalasService
  constructor(private rutaActiva: ActivatedRoute, private apiSalas:ApiSalasService) { }

  /*
    Vamos a obtener los datos de la sala a partir de la ruta activa,
    si no se recibe un id_sala, se asume que es una nueva sala
  */
  ngOnInit(){
    // Si se recibe un id_sala, se obtienen los datos de la sala
    if(this.rutaActiva.snapshot.params['id_sala'] != undefined){
      this.sala = {
        id_sala: this.rutaActiva.snapshot.params['id_sala'],
        nombre: this.rutaActiva.snapshot.params['nombre'],
        ubicacion: this.rutaActiva.snapshot.params['ubicacion'],
        capacidad: this.rutaActiva.snapshot.params['capacidad']
      }

      this.imagen = this.rutaActiva.snapshot.params['imagen'];
      this.nuevaSala = false;

    }else{ // Si no se recibe un id_sala, se asume que es una nueva sala
      this.nuevaSala = true; // Se marca como nueva sala
      this.getImagen(); // Se obtiene una imagen aleatoria
    }
  }


  // Se obtiene una imagen aleatoria
  getImagen(){
    this.imagen = this.apiSalas.getImagen();
  }


  // Se crea una nueva sala
  crearSala(){
    // Se llama al servicio de ApiSalasService para crear una sala
    this.apiSalas.crearSala(this.sala).then((response: any) => {
      if(response.success == true){ // Si la respuesta es exitosa
        alertify.alert('Sala Creada');
        window.location.href = '/salas';
      }else{
        alertify.error(response.message);
      }
    });
  }


  // Se edita una sala
  editarSala(){
    // Se llama al servicio de ApiSalasService para actualizar una sala
    this.apiSalas.actualizarSala(this.sala).then((response: any) => {
      if(response.success == true){ // Si la respuesta es exitosa
        alertify.confirm('Sala Actualizada');
        window.location.href = '/salas';
      }else{
        alertify.error(response.message);
      }
    });
  }

  // Se cancela la edición de una sala
  cancelar(){
    window.location.href = '/salas';
  }
}
