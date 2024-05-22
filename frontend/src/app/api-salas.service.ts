import { Injectable } from '@angular/core';
import { Sala } from './sala.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/*
  Servicio para la comunicación con la API de salas
  Tiene métodos para obtener todas las salas, obtener 
  una sala por su id, crear una sala, actualizar una sala 
  y borrar una sala
*/
export class ApiSalasService {

  // Se define un arreglo de imágenes de salas para simular la selección de una imagen
  imagenes: string[] = ["sala1.jpg", "sala2.jpg", "sala3.jpg", "sala4.jpg", "sala5.jpg", "sala6.jpg", "sala7.jpg", "sala8.jpg", "sala9.jpg", "sala10.jpg", "sala11.jpg", "sala12.jpg", "sala13.jpg", "sala14.jpg", "sala15.jpg", "sala16.jpg", "sala17.jpg", "sala18.jpg", "sala19.jpg", "sala20.jpg"];

  // Se inyecta el módulo HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) { }


  // Método para obtener una imagen aleatoria de salas
  getImagen(): string {
    return this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
  }


  // Método para obtener todas las salas
  getSalas(){
    return this.http.get('http://localhost:3000/salas').toPromise();
  }


  // Método para obtener una sala por su id
  getSala(id:number){
    return this.http.get('http://localhost:3000/salas/'+id).toPromise();
  }


  // Método para crear una sala
  crearSala(sala: Sala){
    return this.http.post('http://localhost:3000/salas', sala).toPromise();
  }

  
  // Método para actualizar una sala
  actualizarSala(sala: Sala){
    return this.http.put('http://localhost:3000/salas/'+sala.id_sala, sala).toPromise();
  }


  // Método para borrar una sala
  borrarSala(id:number){
    return this.http.delete('http://localhost:3000/salas/'+id).toPromise();
  }
}
