import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sala } from '../sala.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiSalasService } from '../api-salas.service';
import * as alertify from 'alertifyjs';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-editar-sala',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './editar-sala.component.html',
  styleUrl: './editar-sala.component.css'
})
export class EditarSalaComponent implements OnInit{

  sala:  Sala = {id_sala: 0, nombre: '', ubicacion: '', capacidad: 0};
  imagen: string = '';
  nuevaSala: boolean = false;

  constructor(private rutaActiva: ActivatedRoute, private apiSalas:ApiSalasService) { }

  ngOnInit(){
    if(this.rutaActiva.snapshot.params['id_sala'] != undefined){
      this.sala = {
        id_sala: this.rutaActiva.snapshot.params['id_sala'],
        nombre: this.rutaActiva.snapshot.params['nombre'],
        ubicacion: this.rutaActiva.snapshot.params['ubicacion'],
        capacidad: this.rutaActiva.snapshot.params['capacidad']
      }
      this.imagen = this.rutaActiva.snapshot.params['imagen'];
      this.nuevaSala = false;
    }else{
      this.nuevaSala = true;
      this.getImagen();
    }
  }

  getImagen(){
    this.imagen = this.apiSalas.getImagen();
  }

  crearSala(){
    this.apiSalas.crearSala(this.sala).then((response: any) => {
      if(response.success == true){
        alertify.alert('Sala Creada');
        window.location.href = '/salas';
      }else{
        alertify.error('No se pudo crear la sala');
      }
    });
  }


  editarSala(){
    console.log(this.sala);
    this.apiSalas.actualizarSala(this.sala).then((response: any) => {
      if(response.success == true){
        alertify.confirm('Sala Actualizada');
        window.location.href = '/salas';
      }else{
        alertify.error('No se pudo actualizar la sala');
      }
    });
  }

  
  
  cancelar(){
    window.location.href = '/salas';
  }

}
