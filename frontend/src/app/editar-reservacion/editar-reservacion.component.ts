import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sala } from '../sala.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiReservasService } from '../api-reservas.service';
import { ApiSalasService } from '../api-salas.service';
import * as alertify from 'alertifyjs';
import { Reservacion } from '../reservacion.model';


@Component({
  selector: 'app-editar-reservacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-reservacion.component.html',
  styleUrl: './editar-reservacion.component.css'
})
export class EditarReservacionComponent implements OnInit{

  sala: Sala[] = [];
  reservacion: Reservacion = { id_reservacion: 0, id_sala: 0, fecha_inicio: new Date(), fecha_fin: new Date()};
  imagen: string = '';
  nuevaJunta: boolean = false;
  nombreJunta: string = '';

  constructor(private rutaActiva: ActivatedRoute, private apiReservas:ApiReservasService, private apiSalas:ApiSalasService) { }

  ngOnInit(){
    if(this.rutaActiva.snapshot.params['id_sala'] != undefined){
      this.reservacion = {
        id_reservacion: this.rutaActiva.snapshot.params['id_reservacion'],
        id_sala: this.rutaActiva.snapshot.params['id_sala'],
        fecha_inicio: this.rutaActiva.snapshot.params['fecha_inicio'],
        fecha_fin: this.rutaActiva.snapshot.params['fecha_fin']
      }
      this.imagen = this.rutaActiva.snapshot.params['imagen'];
      this.nombreJunta = this.rutaActiva.snapshot.params['nombre'];
      this.nuevaJunta = false;
    }else{
      this.nuevaJunta = true;
      this.getImagen();
    }
  }

  getImagen(){
    this.imagen = this.apiSalas.getImagen();
  }

  crearJunta(){
    /*this.apiSalas.crearSala(this.sala).then((response: any) => {
      if(response.success == true){
        alertify.success('Sala Creada');
        window.location.href = '/salas';
      }else{
        alertify.error('No se pudo crear la sala');
      }
    });*/
  }


  editarJunta(){
    console.log(this.reservacion);
    /*this.apiSalas.actualizarSala(this.sala).then((response: any) => {
      if(response.success == true){
        alertify.success('Junta Actualizada');
        window.location.href = '/reservaciones';
      }else{
        alertify.error('No se pudo actualizar la junta');
      }
    });*/
  }

  
  
  cancelar(){
    window.location.href = '/reservaciones';
  }

}
