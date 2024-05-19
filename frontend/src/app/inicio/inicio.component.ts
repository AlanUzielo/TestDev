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

  salas: Sala[] = [];
  reservaciones: Reservacion[] = [];
  
  constructor(private apiSalas: ApiSalasService, private apiReservaciones:ApiReservasService){}

  ngOnInit(): void {
    this.apiSalas.getSalas().then((response: any) => {
      console.log(response);
      this.salas = response;
    });
    this.apiReservaciones.getReservaciones().then((response: any) => {
      console.log(response);
      this.reservaciones = response;
    });
  }

  existenSalas(): boolean {
    if (this.salas.length > 0) {
      return true;
    }
    return false;
  }

  existenReservaciones(): boolean {
    if (this.reservaciones.length > 0) {
      return true;
    }
    return false;
  }

}
