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
  selector: 'app-formulario-reservacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-reservacion.component.html',
  styleUrl: './formulario-reservacion.component.css'
})
export class FormularioReservacionComponent implements OnInit{

  // Se define un arreglo de salas
  salas: Sala[] = [];
  // Se define un arreglo de salas que guardará todas las salas
  salasAux: Sala[] = [];
  // Se define una variable para almacenar la imagen de la sala
  reservacion: Reservacion = { id_reservacion: 0, id_sala: 0, fecha_inicio: new Date(), fecha_fin: new Date()};
  imagen: string = ''; // Se define una variable para almacenar la imagen de la sala
  // Se define una variable para saber si es una nueva sala
  nuevaJunta: boolean = false; 
  // Se define una variable para almacenar el nombre de la sala
  nombreSala: string = '';
  // Se define una variable para almacenar la fecha de inicio
  fecha_inicio: string = '';
  // Se define una variable para almacenar la hora de inicio
  hora_inicio: string = '';
  // Se define una variable para almacenar la fecha de fin
  fecha_fin: string = '';
  // Se define una variable para almacenar la hora de fin
  hora_fin: string = '';
  // Se define un arreglo de horas para las opciones
  optionsHora: string[] = [];
  // Se define un arreglo de horas para las opciones que se usará para filtrar
  optionsHoraAux: string[] = [];

  // Se define el constructor de la clase
  constructor(private rutaActiva: ActivatedRoute, private apiReservas:ApiReservasService, private apiSalas:ApiSalasService) { }

  /*
     Si la reservación ya cuenta con un id, se obtienen los datos de la reservación,
      de lo contrario se obtienen las salas y la imagen de la sala
      Al igual se ajustan las horas de inicio y fin de la reservación
      en el formato correcto
  */
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
      
    }else{ // Si no se cuenta con un id de reservación
      this.nuevaJunta = true; // Se marca como nueva junta
      this.getImagen(); // Se obtiene la imagen de la sala
    }

    this.getSalas(); // Se obtienen las salas
    // Se generan las opciones de hora
    this.optionsHoraAux = this.generarOpionesHora();
    // Se filtran las horas
    this.filtrarHora();
  }

  // Método para formatear la hora
  formatTime(date: Date): string {
    // Se obtiene la hora y se formatea
    const hours = date.getHours().toString().padStart(2, '0');
    return `${hours}:59`;
  }

  /* Método para actualizar la fecha de fin, deben ser iguales
     ya que la ultima hora no rebasa las 24 horas */
  actualizaFechaFin(){
    this.fecha_fin = this.fecha_inicio;
  }

  // Método para obtener las salas
  getSalas(){
    this.apiSalas.getSalas().then((response: any) => {
      this.salasAux = response; // Se guardan todas las salas
      this.filtarSala(); // Se filtran las salas
    });
  }

  // Método para generar las opciones de hora desde las 7:00 hasta las 20:00
  generarOpionesHora(){
    const hours = [];
    for (let i = 7; i <= 20; i++) { // Horas desde las 00:00 hasta las 20:00
      hours.push(i.toString().padStart(2, '0') + ':00');
    }
    return hours;
  }


  // Método para no filtar dos veces el mismo nombre de la sala
  filtarSala(){
    this.salas = this.salasAux.filter(sala => sala.nombre != this.nombreSala);
    this.getImagen();
  }

  // Método para no filtar dos veces la misma hora
  filtrarHora(){
    this.optionsHora = this.optionsHoraAux.filter(hora => hora != this.hora_inicio);
  }

  // Sumarle dos horas a la junta 
  ajustarHoraFin(){
    const horaInicio = parseInt(this.hora_inicio.substring(0, 2));
    let horaFin = horaInicio + 1;
    this.hora_fin = horaFin.toString().padStart(2, '0') + ':59';
  }

  // Método para obtener la imagen de la sala
  getImagen(){
    this.imagen = this.apiSalas.getImagen();
  }


  // Método para crear una junta
  crearJunta(){
    // Se ajusta la hora de inicio y fin
    this.reservacion.fecha_inicio = new Date(this.fecha_inicio + 'T' + this.hora_inicio+':00');
    this.reservacion.fecha_fin = new Date(this.fecha_fin + 'T' + this.hora_fin+':00');
    // Se busca la sala por el nombre
    const salaEncontrada = this.salasAux.find(sala => sala.nombre === this.nombreSala);
    if (salaEncontrada) {
      this.reservacion.id_sala = salaEncontrada.id_sala;
    }

    // Se llama al servicio para crear la reservación
    this.apiReservas.crearReserva(this.reservacion).then((response: any) => {
      if(response.success == true){
        alertify.success('Junta Creada con Éxito');
        window.location.href = '/reservaciones';
      }else{
        alertify.error(response.message);
      }
    });
  }


  // Método para editar una junta
  editarJunta(){
    // Se ajusta la hora de inicio y fin
    this.reservacion.fecha_inicio = new Date(this.fecha_inicio + 'T' + this.hora_inicio+':00');
    this.reservacion.fecha_fin = new Date(this.fecha_fin + 'T' + this.hora_fin+':00');
    // Se busca la sala por el nombre
    const salaEncontrada = this.salasAux.find(sala => sala.nombre === this.nombreSala);
    if (salaEncontrada) {
      this.reservacion.id_sala = salaEncontrada.id_sala;
    }

    // Se llama al servicio para actualizar la reservación
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
