import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiSalasService } from '../api-salas.service';
import { Sala } from '../sala.model';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-vista-salas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vista-salas.component.html',
  styleUrl: './vista-salas.component.css'
})
export class VistaSalasComponent implements OnInit{

  salas: Sala[] = [];
  imagen: string = '';

  constructor(private apiSalas: ApiSalasService){}

  ngOnInit() {
    this.apiSalas.getSalas().then((response: any) => {
      console.log(response);
      this.salas = response;
    });
  }

  existenSalas(): boolean {
    if (this.salas.length > 0) {
      return true;
    }
    return false;
  }

  getImagen(): string{
    this.imagen = this.apiSalas.getImagen();
    return this.imagen;
  }

  borrarSala(id:number){
    alertify.confirm('¿Estás seguro de eliminar esta sala?', () => {
      this.apiSalas.borrarSala(id).then((response: any) => {
        if(response.success == true){
          alertify.success('Sala Eliminada');
          window.location.href = '/salas';
        }else{
          alertify.error('No se pudo eliminar la sala');
        }
      });
    }, () => {
      alertify.error('Operación Cancelada');
    });
  } 
}
