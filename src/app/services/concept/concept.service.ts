import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ConceptService {

  API = "http://localhost:4001/concept";


  constructor(private http: HttpClient) { }

  getAll(id_categoria: string): Observable<any> {
    return this.http.get(this.API+ '/all/'+id_categoria);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(category: any, userID: string):Observable<any>{
    category.usuario = userID;
    console.log(category);
    return this.http.post(this.API, category);
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
