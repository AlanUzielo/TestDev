import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { VistaReservacionesComponent } from '../vista-reservaciones/vista-reservaciones.component';
import { ApiSalasService } from '../api-salas.service';
import { ApiReservasService } from '../api-reservas.service';
import { CommonModule } from '@angular/common';
import { Sala } from '../sala.model';
import { Reservacion } from '../reservacion.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,CarouselComponent, VistaReservacionesComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  salas: Sala[] = []; // Se define un arreglo de salas
  reservaciones: Reservacion[] = []; // Se define un arreglo de reservaciones
  
  // Se inyectan los servicios de ApiSalasService y ApiReservasService
  constructor(private apiSalas: ApiSalasService, private apiReservaciones:ApiReservasService){}


  /*
    Método que se ejecuta al iniciar el componente
    Se obtienen todas las salas y reservaciones
  */
  ngOnInit(): void {
    // Se obtienen todas las salas
    this.apiSalas.getSalas().then((response: any) => {
      this.salas = response; // Se asignan las salas obtenidas a la variable salas
    });

    // Se obtienen todas las reservaciones
    this.apiReservaciones.getReservaciones().then((response: any) => {
      this.reservaciones = response; // Se asignan las reservaciones obtenidas a la variable reservaciones
    });
  }


  // Método para verificar si existen salas
  existenSalas(): boolean {
    if (this.salas.length > 0) {
      return true;
    }
    return false;
  }

  
  // Método para verificar si existen reservaciones
  existenReservaciones(): boolean {
    if (this.reservaciones.length > 0) {
      return true;
    }
    return false;
  }
}
