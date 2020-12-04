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

  save(concept: any, userID: string):Observable<any>{
    concept.usuario = userID;
    console.log(concept);
    return this.http.post(this.API, concept);
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
