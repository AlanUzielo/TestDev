import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Sala } from '../sala.model';
import * as alertify from 'alertifyjs';
import { ApiSalasService } from '../api-salas.service';

@Component({
  selector: 'app-vista-sala',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vista-sala.component.html',
  styleUrl: './vista-sala.component.css'
})
export class VistaSalaComponent implements OnInit{

  sala: Sala = {id_sala: 0, nombre: '', ubicacion: '', capacidad: 0};
  imagen: string = '';

  constructor(private rutaActiva: ActivatedRoute, private apiSalas:ApiSalasService) { }

  ngOnInit(){
    this.sala = {
      id_sala: this.rutaActiva.snapshot.params['id_sala'],
      nombre: this.rutaActiva.snapshot.params['nombre'],
      ubicacion: this.rutaActiva.snapshot.params['ubicacion'],
      capacidad: this.rutaActiva.snapshot.params['capacidad']
    }
    this.imagen = this.rutaActiva.snapshot.params['imagen'];
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
