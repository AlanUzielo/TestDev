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

  salas: Sala[] = [];
  salasAux: Sala[] = [];
  reservacion: Reservacion = { id_reservacion: 0, id_sala: 0, fecha_inicio: new Date(), fecha_fin: new Date()};
  imagen: string = '';
  nuevaJunta: boolean = false;
  nombreSala: string = '';
  fecha_inicio: string = '';
  hora_inicio: string = '';
  fecha_fin: string = '';
  hora_fin: string = '';
  optionsHora: string[] = [];
  optionsHoraAux: string[] = [];

  constructor(private rutaActiva: ActivatedRoute, private apiReservas:ApiReservasService, private apiSalas:ApiSalasService) { }

  ngOnInit(){
    if(this.rutaActiva.snapshot.params['id_reservacion'] != undefined){
      this.reservacion = {
        id_reservacion: this.rutaActiva.snapshot.params['id_reservacion'],
        id_sala: this.rutaActiva.snapshot.params['id_sala'],
        fecha_inicio: this.rutaActiva.snapshot.params['fecha_inicio'],
        fecha_fin: this.rutaActiva.snapshot.params['fecha_fin']
      }
      this.imagen = this.rutaActiva.snapshot.params['imagen'];
      this.nombreSala = this.rutaActiva.snapshot.params['nombre'];
      this.nuevaJunta = false;
      this.reservacion.fecha_inicio = new Date(this.reservacion.fecha_inicio);
      this.reservacion.fecha_fin = new Date(this.reservacion.fecha_fin);
      this.fecha_inicio = this.reservacion.fecha_inicio.toISOString().substring(0, 10);
      this.fecha_fin = this.reservacion.fecha_fin.toISOString().substring(0, 10);
      this.hora_inicio = this.formatTime(this.reservacion.fecha_inicio);
      this.hora_fin = this.formatTime(this.reservacion.fecha_fin);
      console.log(this.hora_inicio);
    }else{
      this.nuevaJunta = true;
      this.getImagen();
    }
    this.getSalas();
    this.optionsHoraAux = this.generarOpionesHora();
    this.filtrarHora();
    console.log(this.optionsHora);
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    return `${hours}:00`;
  }

  actualizaFechaFin(){
    this.fecha_fin = this.fecha_inicio;
  }

  getSalas(){
    this.apiSalas.getSalas().then((response: any) => {
      this.salasAux = response;
      this.filtarSala();
    });
  }

  generarOpionesHora(){
    const hours = [];
    for (let i = 7; i <= 20; i++) { // Horas desde las 00:00 hasta las 20:00
      hours.push(i.toString().padStart(2, '0') + ':00');
    }
    return hours;
  }

  filtarSala(){
    this.salas = this.salasAux.filter(sala => sala.nombre != this.nombreSala);
    this.getImagen();
  }

  filtrarHora(){
    this.optionsHora = this.optionsHoraAux.filter(hora => hora != this.hora_inicio);
  }

  // sumarle dos horas a la hora de inicio
  ajustarHoraFin(){
    const horaInicio = parseInt(this.hora_inicio.substring(0, 2));
    let horaFin = horaInicio + 1;
    if(horaFin > 20){
      horaFin = 20;
    }
    this.hora_fin = horaFin.toString().padStart(2, '0') + ':59';
  }

  getImagen(){
    this.imagen = this.apiSalas.getImagen();
  }

  crearJunta(){
    this.reservacion.fecha_inicio = new Date(this.fecha_inicio + 'T' + this.hora_inicio+':00');
    this.reservacion.fecha_fin = new Date(this.fecha_fin + 'T' + this.hora_fin+':00');
    const salaEncontrada = this.salasAux.find(sala => sala.nombre === this.nombreSala);
    if (salaEncontrada) {
      this.reservacion.id_sala = salaEncontrada.id_sala;
    } else {
      console.error('Sala no encontrada');
      // Manejo del error, como mostrar un mensaje al usuario
    }

    console.log(this.reservacion);
    this.apiReservas.crearReserva(this.reservacion).then((response: any) => {
      if(response.success == true){
        alertify.success('Junta Creada con Éxito');
        window.location.href = '/reservaciones';
      }else{
        alertify.error(response.error.message);
        console.log("Error al crear la junta");
      }
    });
  }


  editarJunta(){
    this.reservacion.fecha_inicio = new Date(this.fecha_inicio + 'T' + this.hora_inicio+':00');
    this.reservacion.fecha_fin = new Date(this.fecha_fin + 'T' + this.hora_fin+':00');
    const salaEncontrada = this.salasAux.find(sala => sala.nombre === this.nombreSala);
    if (salaEncontrada) {
      this.reservacion.id_sala = salaEncontrada.id_sala;
      console.log(this.reservacion.id_sala);
    } else {
      console.error('Sala no encontrada');
      // Manejo del error, como mostrar un mensaje al usuario
    }

    console.log(this.reservacion);
    this.apiReservas.actualizarReserva(this.reservacion).then((response: any) => {
      if(response.success == true){
        alertify.success('Junta Actualizada con Éxito');
        window.location.href = '/reservaciones';
      }else{
        alertify.error(response.message);
      }
    });
  }

  
  
  cancelar(){
    window.location.href = '/reservaciones';
  }

}
