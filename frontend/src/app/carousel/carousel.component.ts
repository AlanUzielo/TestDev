import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Sala } from '../sala.model';
import { RouterLink } from '@angular/router';
import { ApiSalasService } from '../api-salas.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  // Se define un arreglo de salas para mostrar en el carrusel
  @Input() salas: Sala[] = [];

  // Se inyecta el servicio de ApiSalasService
  constructor(private apiSalas: ApiSalasService){}

  // Se define una variable para almacenar la imagen de la sala
  imagen: string = '';

  // Método para obtener una imagen aleatoria de salas
  getImagen(): string {
    this.imagen = this.apiSalas.getImagen();
    return this.imagen;
  }
}
