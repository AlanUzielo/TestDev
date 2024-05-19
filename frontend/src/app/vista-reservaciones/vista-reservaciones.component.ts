import { Component, Input } from '@angular/core';
import { Reservacion } from '../reservacion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-reservaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-reservaciones.component.html',
  styleUrl: './vista-reservaciones.component.css'
})
export class VistaReservacionesComponent {
  @Input() reservaciones: Reservacion[] = [];

  imagenes: string[] = ["sala1.jpeg", "sala2.jpeg", "sala3.jpg", "sala4.jpeg", "sala5.jpg", "sala6.jpg",
    "sala7.jpeg", "sala8.jpeg", "sala9.jpg", "sala10.jpg"];


  getImagen(): string {
    return this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
  }

  verReservacion(reservacion: Reservacion) {
    alert('Reservación de ');
  }

  getNombreSala(id:number): string {
    switch (id) {
      case 1:
        return "Sala de juntas 1";
      case 2:
        return "Sala de juntas 2";
      case 3:
        return "Sala de juntas 3";
      case 4:
        return "Sala de juntas 4";
      case 5:
        return "Sala de juntas 5";
      case 6:
        return "Sala de juntas 6";
      case 7:
        return "Sala de juntas 7";
      case 8:
        return "Sala de juntas 8";
      case 9:
        return "Sala de juntas 9";
      case 10:
        return "Sala de juntas 10";
      default:
        return "Sala de juntas";
    }
  }
}
