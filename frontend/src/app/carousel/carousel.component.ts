import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Sala } from '../sala.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() salas: Sala[] = [];

  imagenes: string[] = ["sala1.jpeg", "sala2.jpeg", "sala3.jpg", "sala4.jpeg", "sala5.jpg", "sala6.jpg",
    "sala7.jpeg", "sala8.jpeg", "sala9.jpg", "sala10.jpg"];


  getImagen(): string {
    return this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
  }

  verSala(sala: Sala) {
    console.log(sala);
  }
}
