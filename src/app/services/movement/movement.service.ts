import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MovementService {

  //API = "http://localhost:4001/movement";
  API = "https://app-integrador1-backend.herokuapp.com/movement";

  constructor(private http: HttpClient) { }

  getAll(userID: string): Observable<any> {
    return this.http.get(this.API +"/allbyuser/"+userID);
  }

  getByDate(objeto: any): Observable<any> {
    return this.http.post(this.API+"/allbydate", objeto);
  }

  getJoin(element: any){
    return this.http.post(this.API+"/join", element);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(movement: any):Observable<any>{
    return this.http.post(this.API, movement);
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
