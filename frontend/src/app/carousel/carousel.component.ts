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
  @Input() salas: Sala[] = [];

  constructor(private apiSalas: ApiSalasService){}

  imagen: string = '';

  getImagen(): string {
    this.imagen = this.apiSalas.getImagen();
    return this.imagen;
  }
}
