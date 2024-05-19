import { Injectable } from '@angular/core';
import { Sala } from './sala.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiSalasService {

  //private salas: Sala[]; 

  constructor(private http: HttpClient) { }

  getSalas(){
    return this.http.get('http://localhost:3000/salas').toPromise();
  }
}
