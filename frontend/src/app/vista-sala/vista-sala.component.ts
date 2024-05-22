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

  // Se define una variable de tipo Sala
  sala: Sala = {id_sala: 0, nombre: '', ubicacion: '', capacidad: 0};
  // Se define una variable para almacenar la imagen de la sala
  imagen: string = ''; 

  // Se inyecta el servicio de ApiSalasService
  constructor(private rutaActiva: ActivatedRoute, private apiSalas:ApiSalasService) { }

  /*
    Método que se ejecuta al iniciar el componente
    Se obtienen los datos de la sala a partir de la ruta activa
  */
  ngOnInit(){
    this.sala = {
      id_sala: this.rutaActiva.snapshot.params['id_sala'],
      nombre: this.rutaActiva.snapshot.params['nombre'],
      ubicacion: this.rutaActiva.snapshot.params['ubicacion'],
      capacidad: this.rutaActiva.snapshot.params['capacidad']
    }

    this.imagen = this.rutaActiva.snapshot.params['imagen'];
  }
  

  /* Metodo para borrar una sala, recibe el id de la sala
      y muestra una alerta de confirmación para
      llamar al servicio y borrar la sala
    */
  borrarSala(id:number){
    alertify.confirm('¿Estás seguro de eliminar esta sala?', () => {
      this.apiSalas.borrarSala(id).then((response: any) => {
        if(response.success == true){
          alertify.success('Sala Eliminada');
          // Se redirige a la lista de salas
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
