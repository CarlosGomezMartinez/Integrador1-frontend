import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MovementService {

  API = "http://localhost:4001/movement";


  constructor(private http: HttpClient) { }

  getAll(userID: string): Observable<any> {
    return this.http.get(this.API+"/allbyuser/"+userID);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(movement: any, userID: string):Observable<any>{
    movement.usuario = userID;
    console.log(movement);
    return this.http.post(this.API, movement);
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
