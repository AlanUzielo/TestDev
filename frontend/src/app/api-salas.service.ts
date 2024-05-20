import { Injectable } from '@angular/core';
import { Sala } from './sala.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiSalasService {

  //private salas: Sala[];
  imagenes: string[] = ["sala1.jpeg", "sala2.jpeg", "sala3.jpg", "sala4.jpeg", "sala5.jpg", "sala6.jpg",
    "sala7.jpeg", "sala8.jpeg", "sala9.jpg", "sala10.jpg"]; 

  constructor(private http: HttpClient) { }

  getImagen(): string {
    return this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
  }

  getSalas(){
    return this.http.get('http://localhost:3000/salas').toPromise();
  }

  getSala(id:number){
    return this.http.get('http://localhost:3000/salas/'+id).toPromise();
  }

  crearSala(sala: Sala){
    return this.http.post('http://localhost:3000/salas', sala).toPromise();
  }

  actualizarSala(sala: Sala){
    return this.http.put('http://localhost:3000/salas/'+sala.id_sala, sala).toPromise();
  }

  borrarSala(id:number){
    return this.http.delete('http://localhost:3000/salas/'+id).toPromise();
  }
}
