import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiReservasService {

  constructor(private http:HttpClient) { }

  getReservaciones(){
    return this.http.get('http://localhost:3000/reservas').toPromise();
  }



  borrarJunta(id:number){
    return this.http.delete('http://localhost:3000/reservas/'+id).toPromise();
  }
}
